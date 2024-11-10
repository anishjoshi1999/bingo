"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
// Custom Toggle Switch Component
const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isOn}
          onChange={handleToggle}
        />
        <div
          className={`block w-14 h-8 rounded-full ${
            isOn ? "bg-green-400" : "bg-gray-400"
          }`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
            isOn ? "transform translate-x-6" : ""
          }`}
        ></div>
      </div>
    </label>
  );
};

function Page({ params }) {
  const { bingoType } = params;
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [recentNumber, setRecentNumber] = useState(null);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [animatingNumber, setAnimatingNumber] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [bingoCode, setBingoCode] = useState(""); // New state for Bingo code
  const [fetchedCard, setFetchedCard] = useState(null); // New state for fetched card
  const [searchError, setSearchError] = useState(""); // New state for search error

  const totalNumbers = bingoType === "90-ball" ? 90 : 75;
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);

  useEffect(() => {
    // Initialize audio context
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();

    return () => {
      // Cleanup audio context on component unmount
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSound = (frequency) => {
    if (!isAudioEnabled || !audioContextRef.current) return;

    // Stop previous oscillator if it exists
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }

    // Create and configure oscillator
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(
      frequency,
      audioContextRef.current.currentTime
    );
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);

    // Connect and start
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    oscillator.start();
    oscillatorRef.current = oscillator;

    // Stop after a short duration
    setTimeout(() => {
      oscillator.stop();
      oscillatorRef.current = null;
    }, 100);
  };
  const checkWinner = async () => {
    setSearchError("");
    try {
      const response = await fetch("/api/check-winner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: bingoCode }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch card");
      }

      const data = await response.json();
      console.log(data);
      setFetchedCard(data.card);
    } catch (error) {
      setSearchError(error.message);
    }
  };
  const generateRandomNumber = () => {
    if (generatedNumbers.length === totalNumbers) {
      alert("All numbers have been drawn!");
      return;
    }

    setIsGenerating(true);
    const animationDuration = Math.floor(Math.random() * 4000) + 1000; // Random duration between 1 to 5 seconds

    const animationInterval = setInterval(() => {
      let randomNum;
      do {
        randomNum = Math.floor(Math.random() * totalNumbers) + 1;
      } while (generatedNumbers.includes(randomNum));
      setAnimatingNumber(randomNum);

      // Play sound with frequency based on the number
      playSound(200 + randomNum * 10);
    }, 100);

    setTimeout(() => {
      clearInterval(animationInterval);
      let finalNumber;
      do {
        finalNumber = Math.floor(Math.random() * totalNumbers) + 1;
      } while (generatedNumbers.includes(finalNumber));

      setGeneratedNumbers((prev) => [...prev, finalNumber]);
      setRecentNumber(finalNumber);
      setAnimatingNumber(null);
      setIsGenerating(false);

      // Play a final "success" sound
      playSound(800);
    }, animationDuration);
  };

  const resetGame = () => {
    setGeneratedNumbers([]);
    setRecentNumber(null);
    setShowResetConfirmation(false);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  return (
    <>
      <Head>
        <title>
          {bingoType === "90-ball" ? "90-Ball Bingo" : "75-Ball Bingo"} | Fun
          Bingo Game
        </title>
        <meta
          name="description"
          content="Play a fun game of Bingo! Generate numbers and check if you have won. Play 90-ball or 75-ball Bingo!"
        />
        <meta
          name="keywords"
          content="Bingo, 90-ball Bingo, 75-ball Bingo, Play Bingo, Bingo Game"
        />
        <meta property="og:title" content="Bingo Game | Play Now" />
        <meta
          property="og:description"
          content="Join the Bingo fun! Generate random numbers and check if you have a winner."
        />
      </Head>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-b from-indigo-100 to-purple-200 p-4">
        {/* Left side - Number table (70% width) */}
        <div className="w-full md:w-[70%] p-4 bg-white rounded-lg shadow-md overflow-hidden">
          <h1 className="text-4xl font-bold mb-4 text-indigo-800 text-center">
            {bingoType === "90-ball" ? "90-Ball Bingo" : "75-Ball Bingo"}
          </h1>
          <div className="grid grid-cols-10 gap-2">
            {Array.from({ length: totalNumbers }).map((_, index) => {
              const num = index + 1;
              return (
                <div
                  key={num}
                  className={`flex items-center justify-center w-10 h-10 text-xl font-bold rounded-md transition-all duration-200 cursor-pointer
                    ${
                      generatedNumbers.includes(num)
                        ? num === recentNumber
                          ? "bg-red-500 text-white animate-pulse"
                          : "bg-green-300"
                        : num === animatingNumber
                        ? "bg-yellow-300 animate-pulse"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  {num}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side - Controls and generated numbers (30% width) */}
        <div className="w-full md:w-[30%] p-4 flex flex-col">
          {/* Action Buttons */}
          <div className="flex flex-col gap-4 mb-8">
            <button
              onClick={generateRandomNumber}
              disabled={isGenerating}
              className={`px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105
                ${
                  isGenerating
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-700"
                }`}
            >
              {isGenerating ? "Generating..." : "Generate Number"}
            </button>

            <button
              onClick={() => setShowResetConfirmation(true)}
              disabled={isGenerating}
              className={`px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105
                ${
                  isGenerating
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-600"
                }`}
            >
              Reset Game
            </button>

            {/* Audio Toggle */}
            <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow">
              <span className="text-lg font-semibold text-gray-700">Audio</span>
              <ToggleSwitch isOn={isAudioEnabled} handleToggle={toggleAudio} />
            </div>
          </div>
          {/* Check Winner Section */}
          <div className="flex flex-col gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter Bingo Code"
              value={bingoCode}
              onChange={(e) => setBingoCode(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={checkWinner}
              className={`px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105`}
            >
              Check Winner
            </button>
            {searchError && <p className="text-red-500">{searchError}</p>}
          </div>

          {/* Generated Numbers Section */}
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2 flex items-center justify-center">
            Generated Numbers 🎉
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {generatedNumbers.map((num, index) => (
              <div
                key={`call-${index + 1}`}
                className={`flex flex-col items-center justify-center w-24 h-12 rounded-lg shadow-md transition-all duration-200
                  ${
                    index === generatedNumbers.length - 1
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-blue-300 hover:bg-blue-400"
                  }`}
              >
                <span className="text-lg font-bold">{num}</span>
                <span className="text-xs text-gray-800">ball-{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reset Confirmation Dialog */}
        {showResetConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-2">Reset Game</h2>
              <p className="mb-4">
                Are you sure you want to reset the game? This action will clear
                all generated numbers.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowResetConfirmation(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={resetGame}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {fetchedCard && fetchedCard.card && fetchedCard.card.length > 0 && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Bingo Card</h2>
          <table className="w-full border-collapse">
            <tbody>
              {fetchedCard.card.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((number, colIndex) => {
                    const isGeneratedNumber = generatedNumbers.includes(number);
                    const isFreeSpace =
                      fetchedCard.withFreeSpace &&
                      rowIndex === Math.floor(fetchedCard.card.length / 2) &&
                      colIndex === Math.floor(row.length / 2);
                    const cellClass = `
                        border-2 border-indigo-300 px-4 py-3 text-xl font-medium text-center 
                        ${
                          isGeneratedNumber
                            ? "bg-orange-400"
                            : isFreeSpace
                            ? "bg-indigo-100"
                            : "bg-gray-200"
                        } 
                        hover:bg-indigo-200 transition-colors duration-200
                      `;
                    return (
                      <td key={colIndex} className={cellClass}>
                        {number || (isFreeSpace ? "FREE" : "")}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Page;
