import dbConnect from "@/lib/dbConnect";
import BingoCard from "@/Models/BingoCard";

async function handler(req, res) {
  await dbConnect(); // Connect to the database

  if (req.method === "POST") {
    try {
      const { occasionName, cards } = req.body;
      console.log(req.body)
      // Normalize cards to always be an array
      const cardsArray = Array.isArray(cards) ? cards : [cards];

      // Create BingoCard instances
      const newCards = cardsArray.map(card => new BingoCard({ occasionName, card }));

      // Save all bingo cards to the database
      await BingoCard.insertMany(newCards); // Use insertMany for bulk insertion

      return res.status(200).json({ success: true, cards: newCards });
    } catch (error) {
      console.error("Error saving bingo card:", error);
      return res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const cards = await BingoCard.find({});
      return res.status(200).json({ success: true, cards });
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
