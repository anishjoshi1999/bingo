"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Loader2 } from "lucide-react";

const Page = ({ params }) => {
  const { type } = params;
  const [cardCount, setCardCount] = useState(1);
  const [occasionName, setOccasionName] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [error, setError] = useState("");
  const [freeSpace, setFreeSpace] = useState(false);

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
        setCards(data.cards);
      } else {
        throw new Error(data.message || "Failed to generate cards");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setDownloadLoading(true);
    const pdf = new jsPDF();
    const cardsContainer = document.getElementById("bingo-cards-container");
  
    if (!cardsContainer) {
      setError("No cards to download");
      setDownloadLoading(false);
      return;
    }
  
    const cards = cardsContainer.getElementsByClassName("bingo-card");
  
    // PDF dimensions and margin setup
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const maxCardWidth = (pageWidth - 3 * margin) / 2;
    const maxCardHeight = (pageHeight - 5 * margin) / 4;
  
    try {
      for (let i = 0; i < cards.length; i += 8) {
        if (i !== 0) {
          pdf.addPage();
        }
  
        for (let j = 0; j < 8 && (i + j) < cards.length; j++) {
          const card = await html2canvas(cards[i + j], {
            scale: 2,
            useCORS: true,
          });
          const imgData = card.toDataURL("image/png");
  
          const originalWidth = card.width;
          const originalHeight = card.height;
          const aspectRatio = originalWidth / originalHeight;
  
          let cardWidth, cardHeight;
          if (aspectRatio > 1) {
            cardWidth = Math.min(maxCardWidth, originalWidth);
            cardHeight = cardWidth / aspectRatio;
          } else {
            cardHeight = Math.min(maxCardHeight, originalHeight);
            cardWidth = cardHeight * aspectRatio;
          }
  
          const xPosition = margin + (j % 2) * (maxCardWidth + margin);
          const yPosition = margin + Math.floor(j / 2) * (maxCardHeight + margin);
  
          const xCentered = xPosition + (maxCardWidth - cardWidth) / 2;
          const yCentered = yPosition + (maxCardHeight - cardHeight) / 2;
  
          pdf.addImage(imgData, "PNG", xCentered, yCentered, cardWidth, cardHeight);
        }
      }
  
      pdf.save(`${occasionName || "bingo"}_cards.pdf`);
    } catch (err) {
      setError("Failed to generate PDF. Please try again.");
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <>
      <Navbar />
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
          <div className="mt-8 w-full" id="bingo-cards-container">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Your Bingo Cards
            </h2>
            <button
              onClick={handleDownloadPDF}
              disabled={downloadLoading}
              className="mb-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg flex items-center gap-2 disabled:bg-green-400"
            >
              {downloadLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Please wait, preparing your tickets...</span>
                </>
              ) : (
                "Download Cards as PDF"
              )}
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-auto">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden bingo-card print:block print:mb-8"
                >
                  <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
                    <h3 className="text-2xl font-bold">
                      Bingo Zone {type === "90-ball" ? "90" : "75"} Ball Bingo
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
                                    rowIndex === Math.floor(card.card.length / 2) &&
                                    colIndex === Math.floor(row.length / 2))
                                    ? "bg-indigo-100"
                                    : "bg-gray-200"
                                } hover:bg-indigo-200 transition-colors duration-200`}
                              >
                                {number ||
                                  (card.withFreeSpace &&
                                  rowIndex === Math.floor(card.card.length / 2) &&
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
                  <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
                    <span className="text-sm">Code: {card.code}</span>
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