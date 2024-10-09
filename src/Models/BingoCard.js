const mongoose = require("mongoose");
import slugify from "slugify";
const bingoCardSchema = new mongoose.Schema(
  {
    occasionName: { type: String, required: true, unique: true },
    card: {
      type: [[Number]], // 2D array to hold the Bingo card numbers (3 rows x 9 columns)
      required: true,
    },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);
// Pre-save middleware to generate slug
bingoCardSchema.pre("save", async function (next) {
  const count = await mongoose.models.BingoCard.countDocuments({});
  if (this.occasionName) {
    let temp = `${this.occasionName} ${count}`;
    this.slug = slugify(temp, { lower: true, strict: true });
  }

  next();
});
const BingoCard =
  mongoose.models.BingoCard || mongoose.model("BingoCard", bingoCardSchema);

module.exports = BingoCard;
