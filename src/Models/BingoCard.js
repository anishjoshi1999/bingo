const mongoose = require("mongoose");
const bingoCardSchema = new mongoose.Schema(
  {
    card: {
      type: [[mongoose.Schema.Types.Mixed]], // 2D array to hold the Bingo card numbers (3 rows x 9 columns for 90-ball, 5 rows x 5 columns for 75-ball)
      required: true,
    },
    withFreeSpace: { type: Boolean, default: false },
    bingoType: {
      type: String,
      enum: ['90-ball', '75-ball'], // Define enum values for bingo types
      required: true, // Make this field required
    },
  },
  { timestamps: true }
);
// Create a compound index to enforce uniqueness based on card and type
bingoCardSchema.index({ card: 1, bingoType: 1, withFreeSpace: 1 }, { unique: true });

const BingoCard =
  mongoose.models.BingoCard || mongoose.model("BingoCard", bingoCardSchema);

module.exports = BingoCard;
