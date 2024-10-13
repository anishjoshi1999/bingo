const generateBingo75Card = (includeFreeSpace = false) => {
    const card = Array.from({ length: 5 }, () => Array(5).fill(null));
    const usedNumbers = new Set();

    const columnRanges = [
        [1, 15],   // B column
        [16, 30],  // I column
        [31, 45],  // N column
        [46, 60],  // G column
        [61, 75]   // O column
    ];

    // Fill the first number in each column
    for (let col = 0; col < 5; col++) {
        const [min, max] = columnRanges[col];

        // Fill the column with 5 unique numbers
        for (let row = 0; row < 5; row++) {
            let number;
            do {
                number = Math.floor(Math.random() * (max - min + 1)) + min;
            } while (usedNumbers.has(number));

            usedNumbers.add(number);
            card[row][col] = number;
        }
    }

    // Set the free space in the center
    if (includeFreeSpace) {
        card[2][2] = "FREE"; // Center of the 5x5 card
    }

    return card;
};

module.exports = generateBingo75Card;
