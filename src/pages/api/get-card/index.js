import dbConnect from "@/lib/dbConnect";
import BingoCard from "@/Models/BingoCard";

async function handler(req, res) {
  await dbConnect(); // Connect to the database

  if (req.method === "POST") {
    try {
      const { count: countString, type, withFreeSpace } = req.body;
      console.log(req.body);
      let count = Number(countString);
      if (isNaN(count) || count <= 0) {
        return res.status(400).json({ error: "Invalid count value" });
      }

      // Use MongoDB's aggregation pipeline for true randomness
      const cards = await BingoCard.aggregate([
        { $match: { bingoType: type, withFreeSpace } },
        { $sample: { size: count } }
      ]);

      if (!cards || cards.length === 0) {
        return res.status(404).json({
          success: false,
          error: "No cards available for the selected options",
        });
      }

      return res.status(200).json({ success: true, cards });
    } catch (error) {
      console.error("Error fetching bingo cards:", error);
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;