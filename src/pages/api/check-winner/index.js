import dbConnect from "@/lib/dbConnect";
import BingoCard from "@/Models/BingoCard";

async function handler(req, res) {
  await dbConnect(); // Connect to the database

  if (req.method === "POST") {
    try {
      const { code } = req.body;
      if (!code) {
        return res.status(400).json({ error: "No Bingo Code Provided" });
      }
      const card = await BingoCard.findOne({code})

      if (!card ) {
        return res.status(404).json({
          success: false,
          error: "No card available for the code",
        });
      }

      return res.status(200).json({ success: true, card });
    } catch (error) {
      console.log(error);
      console.error("Error fetching bingo card:", error);
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
