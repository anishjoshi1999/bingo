import dbConnect from "@/lib/dbConnect";
import BingoCard from "@/Models/BingoCard";
async function handler(req, res) {
  await dbConnect(); // Connect to the database

  if (req.method === "POST") {
    try {
      const { occasionName, card } = req.body;

      // Create a new BingoCard instance
      const newCard = new BingoCard({
        occasionName,
        card,
      });

      // Save the bingo card to the database
      await newCard.save();

      return res.status(200).json({ success: true, card: newCard });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      let cards = await BingoCard.find({});
      return res.status(200).json({ success: true, cards: cards });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
