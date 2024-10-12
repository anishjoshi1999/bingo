import dbConnect from "@/lib/dbConnect";
import BingoCard from "@/Models/BingoCard";

async function handler(req, res) {
  await dbConnect(); // Connect to the database

  if (req.method === "POST") {
    const { occasionName } = req.body;

    try {
      // Fetch bingo cards based on the provided occasion name
      let cards = await BingoCard.find({ occasionName });

      if (cards.length === 0) {
        return res.status(404).json({ success: false, message: "No bingo cards found for this occasion." });
      }

      return res.status(200).json({ success: true, cards });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: "Server error occurred." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
