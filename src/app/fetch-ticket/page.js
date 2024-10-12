"use client";
import React, { useState } from "react";
import { Camera } from "lucide-react";
import html2canvas from "html2canvas"; // Import html2canvas

const PlayBingo = () => {
  const [occasionName, setOccasionName] = useState("");
  const [bingoCards, setBingoCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTicketId, setSearchTicketId] = useState(""); // State for the search input

  const fetchBingoCards = async () => {
    if (!occasionName) {
      setError("Please enter an occasion name");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/play-bingo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ occasionName }),
      });

      const data = await response.json();
      if (data.success) {
        setBingoCards(data.cards);
      } else {
        setError("No cards found for this occasion");
      }
    } catch (err) {
      setError("An error occurred while fetching the bingo cards");
    } finally {
      setLoading(false);
    }
  };

  const downloadTicket = async (ticketId) => {
    console.log("Downloading ticket with ID:", ticketId); // Debug log
    const element = document.getElementById(ticketId);
    if (!element) {
      console.error("Element not found:", ticketId); // Log if element is not found
      return; // Exit if element is not found
    }

    const canvas = await html2canvas(element, {
      useCORS: true, // Allow cross-origin images
    });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = `${ticketId}.jpg`;
    link.click();
  };

  // Filter bingo cards based on the search input
  const filteredBingoCards = bingoCards.filter(card =>
    card.slug.toLowerCase().includes(searchTicketId.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
      <h2 className="text-4xl font-bold mb-8 text-indigo-800">
        Lucky Stars Bingo
      </h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter occasion name"
          value={occasionName}
          onChange={(e) => setOccasionName(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={fetchBingoCards}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : (
            "Get Your Bingo Card"
          )}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* New search box for ticket ID */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 w-full max-w-md">
        <input
          type="text"
          placeholder="Search by Ticket ID"
          value={searchTicketId}
          onChange={(e) => setSearchTicketId(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {filteredBingoCards.length > 0 && (
        <div className="w-full max-w-2xl">
          {filteredBingoCards.map((card, index) => (
            <div
              id={card.slug} // Set unique ID for each card
              key={index}
              className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold">Lucky Stars Bingo</h3>
                <span className="text-sm">Card #{card.slug}</span>
              </div>
              <div className="p-6">
                <div className="mb-4 text-center">
                  <span className="text-xl font-semibold text-indigo-800">
                    {card.occasionName}
                  </span>
                </div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {["B", "I", "N", "G", "O"].map((letter) => (
                        <th
                          key={letter}
                          className="border-2 border-indigo-600 px-4 py-2 text-2xl font-bold text-indigo-600"
                        >
                          {letter}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {card.card.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((num, colIndex) => (
                          <td
                            key={colIndex}
                            className={`border-2 border-indigo-300 px-4 py-3 text-xl font-medium text-center
                              ${
                                rowIndex === 2 && colIndex === 2
                                  ? "bg-gray-200" // Change to gray background for center cell
                                  : "hover:bg-indigo-100 transition-colors duration-200"
                              }`}
                          >
                            {num || ""} {/* Render the number or an empty string */}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Valid for one game only
                  </span>
                  <button
                    onClick={() => downloadTicket(card.slug)} // Use slug for ticket ID
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300 flex items-center"
                  >
                    <Camera className="mr-2" size={18} />
                    Download Ticket
                  </button>
                </div>
              </div>
              <div className="bg-gray-200 p-2 text-center text-sm text-gray-600">
                Lucky Stars Bingo | Play responsibly | Must be 18+ to play
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayBingo;
