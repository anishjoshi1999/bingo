"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
const Page = ({ params }) => {
  const { type } = params;
  const [cardCount, setCardCount] = useState(1); // Default to 1 card
  const [occasionName, setOccasionName] = useState(""); // State for Occasion Name
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [freeSpace, setFreeSpace] = useState(false); // State for FREE space checkbox

  const handleCreateCards = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/get-card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count: cardCount,
          type: type,
          withFreeSpace: freeSpace,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create cards");
      }

      const data = await response.json();
      if (data.success) {
        setCards(data.cards); // Assuming cards are returned in the response
      } else {
        throw new Error(data.message || "Failed to generate cards");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-100 to-purple-200 p-6 sm:p-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-indigo-800 text-center">
          {type === "90-ball"
            ? "Create 90-Ball Bingo Cards"
            : "Create 75-Ball Bingo Cards"}
        </h1>

        <div className="mb-6 w-full max-w-md">
          <label className="text-lg text-gray-700 mb-2" htmlFor="occasionName">
            What is the occasion name?
          </label>
          <input
            id="occasionName"
            type="text"
            value={occasionName}
            onChange={(e) => setOccasionName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="mb-6 w-full max-w-md">
          <label className="text-lg text-gray-700 mb-2" htmlFor="cardCount">
            How many cards do you want to create?
          </label>
          <input
            id="cardCount"
            type="number"
            value={cardCount}
            min="1"
            onChange={(e) => setCardCount(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
          <p className="mt-4 text-gray-600 italic">
            Note: Generate all the cards in one go.
          </p>
        </div>

        <div className="mb-6 w-full max-w-md">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={freeSpace}
              onChange={(e) => setFreeSpace(e.target.checked)}
              className="mr-2"
            />
            Do you want a FREE space on your card?
          </label>
        </div>

        <button
          onClick={handleCreateCards}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg"
          disabled={loading}
        >
          {loading ? "Generating Cards..." : "Generate Cards"}
        </button>
        <p className="mt-4 text-gray-600 italic">
          Note: All generated cards are unique
        </p>
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {cards.length > 0 && (
          <div className="mt-8 w-full">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Your Bingo Cards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-auto">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
                    <h3 className="text-2xl font-bold">
                      Lucky Stars {type === "90-ball" ? "90" : "75"} Ball Bingo
                    </h3>
                    <span className="text-sm">Card #{index + 1}</span>
                  </div>
                  <div className="p-6">
                    <div className="mb-4 text-center">
                      <span className="text-xl font-semibold text-indigo-800">
                        {occasionName}
                      </span>
                    </div>
                    <table className="w-full border-collapse">
                      <tbody>
                        {card.card.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((number, colIndex) => (
                              <td
                                key={colIndex}
                                className={`border-2 border-indigo-300 px-4 py-3 text-xl font-medium text-center ${
                                  number ||
                                  (card.withFreeSpace &&
                                    rowIndex ===
                                      Math.floor(card.card.length / 2) &&
                                    colIndex === Math.floor(row.length / 2))
                                    ? "bg-indigo-100"
                                    : "bg-gray-200"
                                } hover:bg-indigo-200 transition-colors duration-200`}
                              >
                                {number ||
                                  (card.withFreeSpace &&
                                  rowIndex ===
                                    Math.floor(card.card.length / 2) &&
                                  colIndex === Math.floor(row.length / 2)
                                    ? "FREE"
                                    : "")}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
