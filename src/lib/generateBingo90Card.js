const generateBingo90Card = (includeFreeSpace = false) => {
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

    // Fill the first number in each column
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

    // Fill the remaining numbers to ensure each row has at least 5 numbers
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

    // Include the free space if the flag is set
    if (includeFreeSpace) {
        card[1][4] = "FREE"; // Center of the 3x9 card
    }

    return card;
};


module.exports = generateBingo90Card;
