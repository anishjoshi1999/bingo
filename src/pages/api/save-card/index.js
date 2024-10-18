import dbConnect from "@/lib/dbConnect";
import BingoCard from "@/Models/BingoCard";
import generateBingo90Card from "@/lib/generateBingo90Card";
import generateBingo75Card from "@/lib/generateBingo75Card";
import Randomstring from "randomstring";
function generateUniqueString() {
  return Randomstring.generate({
    length: 6,   // Length of the string
    charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'  // Uppercase letters and numbers
  });
}
async function handler(req, res) {
  await dbConnect(); // Connect to the database

  if (req.method === "POST") {
    try {
      const { count, type, withFreeSpace } = req.body; // Expecting the count of cards and type to generate from the request body
      const bingoType = type;

      // Validate count
      if (!count || count <= 0) {
        return res.status(400).json({
          success: false,
          message: "Count must be a positive number.",
        });
      }

      // Validate bingo type
      if (bingoType !== "90-ball" && bingoType !== "75-ball") {
        return res.status(400).json({
          success: false,
          message: "Invalid bingo type. Must be either '90-ball' or '75-ball'.",
        });
      }

      const cardsToSave = [];
      const existingCards = await BingoCard.find({ bingoType }).exec(); // Fetch existing cards for the specific type
      const existingCardSet = new Set(
        existingCards.map((card) => JSON.stringify(card.card))
      ); // Create a set for fast lookups

      let uniqueCardsCount = 0;

      while (uniqueCardsCount < count) {
        let card;
        const withFreeSpaceBool = withFreeSpace === "true"; // Convert to boolean
        if (bingoType === "90-ball") {
          card = generateBingo90Card(withFreeSpaceBool); // Generate a Bingo 90 card
        } else if (bingoType === "75-ball") {
          card = generateBingo75Card(withFreeSpaceBool); // Generate a Bingo 75 card
        } else {
          console.error("Bingo Type did not match:");
          return res.status(400).json({ success: false });
        }

        // Check if the card is unique
        if (!existingCardSet.has(JSON.stringify(card))) {
          cardsToSave.push({
            card,
            bingoType,
            withFreeSpace: withFreeSpaceBool,
            code: generateUniqueString()
          }); // Prepare the card for saving
          existingCardSet.add(JSON.stringify(card)); // Add to the set
          uniqueCardsCount++; // Increment count of unique cards saved
        }
      }

      // Bulk save all unique cards to the database
      await BingoCard.insertMany(cardsToSave);

      return res.status(200).json({
        success: true,
        message: `${uniqueCardsCount} unique Bingo cards generated and saved successfully.`,
      });
    } catch (error) {
      console.error("Error saving bingo cards:", error);
      return res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const cards = await BingoCard.find({});

      // Create a Set to track unique cards
      const uniqueCardsSet = new Set();
      const uniqueCards = [];

      for (const card of cards) {
        const cardString = JSON.stringify(card.card); // Convert card to string for comparison
        if (!uniqueCardsSet.has(cardString)) {
          uniqueCardsSet.add(cardString); // Add to the set
          uniqueCards.push(card); // Store the unique card
        }
      }

      return res.status(200).json({
        success: true,
        count: uniqueCards.length,
        cards: uniqueCards,
      });
    } catch (error) {
      console.error("Error fetching bingo cards:", error);
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
