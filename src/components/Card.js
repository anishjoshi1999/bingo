// components/BingoCard.js
import React, { useState, useEffect } from 'react';

const generateUniqueBingoCard = () => {
    const card = Array.from({ length: 3 }, () => Array(9).fill(null));
    const usedNumbers = new Set();

    const columnRanges = [
        [1, 9],
        [10, 19],
        [20, 29],
        [30, 39],
        [40, 49],
        [50, 59],
        [60, 69],
        [70, 79],
        [80, 90]
    ];

    for (let col = 0; col < 9; col++) {
        let number;
        const [min, max] = columnRanges[col];

        do {
            number = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (usedNumbers.has(number));

        usedNumbers.add(number);
        const row = Math.floor(Math.random() * 3);
        card[row][col] = number;
    }

    for (let row = 0; row < 3; row++) {
        const columnsFilled = new Set(card[row].map((num, index) => (num ? index : null)).filter(index => index !== null));

        while (columnsFilled.size < 5) {
            const column = Math.floor(Math.random() * 9);
            if (!columnsFilled.has(column)) {
                let number;
                const [min, max] = columnRanges[column];

                do {
                    number = Math.floor(Math.random() * (max - min + 1)) + min;
                } while (usedNumbers.has(number));

                usedNumbers.add(number);
                card[row][column] = number;
                columnsFilled.add(column);
            }
        }
    }

    return card;
};

const Card = () => {
    const [bingoCard, setBingoCard] = useState([]);

    const saveBingoCardToDatabase = async (card) => {
        const response = await fetch('/api/generate-card', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ occasionName: 'Default Occasion', card }),
        });

        const data = await response.json();
        if (data.success) {
            console.log('Bingo card saved successfully!');
        } else {
            console.error('Error saving bingo card:', data.error);
        }
    };

    const generateCard = () => {
        const newCard = generateUniqueBingoCard();
        setBingoCard(newCard);
        saveBingoCardToDatabase(newCard);
    };

    useEffect(() => {
        generateCard();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">90 Ball Bingo Card</h2>
            <table className="table-auto border-collapse border border-gray-400">
                <tbody>
                    {bingoCard.map((row, rowIndex) => (
                        <tr key={rowIndex} className="h-12">
                            {row.map((number, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`border border-gray-400 text-center ${number ? 'bg-blue-200' : 'bg-gray-200'} w-[50px] h-[50px]`}
                                >
                                    {number || ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={generateCard}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Generate New Card
            </button>
        </div>
    );
};

export default Card;
