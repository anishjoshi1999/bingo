"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import { Camera } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

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
    const [bingoCards, setBingoCards] = useState([]); // Changed to handle multiple cards
    const [occasionName, setOccasionName] = useState('');
    const [ticketCount, setTicketCount] = useState(1); // State for number of tickets
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const saveBingoCardsToDatabase = async (cards) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/generate-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ occasionName, cards }), // Send all cards in one request
            });

            const data = await response.json();
            if (data.success) {
                toast.success(`Successfully created ${ticketCount} ticket${ticketCount > 1 ? 's' : ''}!`); // Show success toast
            } else {
                toast.error(`Error saving bingo cards: ${data.error}`); // Show error toast
            }
        } catch (err) {
            toast.error('An error occurred while saving the bingo cards'); // Show error toast
        } finally {
            setLoading(false);
        }
    };

    const generateCards = () => {
        if (!occasionName) {
            setError("Please enter an occasion name.");
            return;
        }

        const newCards = [];
        for (let i = 0; i < ticketCount; i++) {
            const newCard = generateUniqueBingoCard();
            newCards.push(newCard);
        }

        setBingoCards(newCards); // Update state with all generated cards
        saveBingoCardsToDatabase(newCards); // Save all cards to the database
    };

    const downloadTicket = () => {
        // Implement download functionality here
        console.log('Downloading ticket');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-100 to-purple-200 p-6 sm:p-12">
            <Head>
                <title>90 Ball Bingo</title>
                <meta name="description" content="90 Ball Bingo Card Generator" />
            </Head>

            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-indigo-800 text-center">Lucky Stars 90 Ball Bingo</h2>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 w-full max-w-md">
                <input
                    type="text"
                    placeholder="Enter occasion name"
                    value={occasionName}
                    onChange={(e) => setOccasionName(e.target.value)}
                    className="mb-4 px-4 py-2 border border-indigo-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200"
                />
                <input
                    type="number"
                    placeholder="Number of tickets"
                    value={ticketCount}
                    onChange={(e) => setTicketCount(Math.max(1, Number(e.target.value)))}
                    className="mb-4 px-4 py-2 border border-indigo-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200"
                    min={1}
                />
                <button
                    onClick={generateCards}
                    className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center ${loading && 'opacity-50 cursor-not-allowed'}`}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </span>
                    ) : (
                        'Generate New Cards'
                    )}
                </button>
            </div>

            {error && <p className="text-red-500 mt-2 mb-4">{error}</p>}

            {bingoCards.length > 0 && (
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
                    {bingoCards.map((bingoCard, cardIndex) => (
                        <div key={cardIndex} className="border-b last:border-b-0">
                            <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
                                <h3 className="text-2xl font-bold">Lucky Stars 90 Ball Bingo</h3>
                                <span className="text-sm">Card #{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span>
                            </div>
                            <div className="p-6">
                                <div className="mb-4 text-center">
                                    <span className="text-xl font-semibold text-indigo-800">{occasionName}</span>
                                </div>
                                <table className="w-full border-collapse">
                                    <tbody>
                                        {bingoCard.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {row.map((number, colIndex) => (
                                                    <td
                                                        key={colIndex}
                                                        className={`border-2 border-indigo-300 px-4 py-3 text-xl font-medium text-center
                                                            ${number ? 'bg-indigo-100' : 'bg-gray-200'} 
                                                            hover:bg-indigo-200 transition-colors duration-200`}
                                                    >
                                                        {number || ''}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-6 flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Valid for one game only</span>
                                    <button
                                        onClick={downloadTicket}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center"
                                    >
                                        <Camera className="mr-2" size={18} />
                                        Download Ticket
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <ToastContainer /> {/* Add ToastContainer here */}
                </div>
            )}
        </div>
    );
};

export default Card;
