"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
const PlayBingoOptionsPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-100 to-purple-200 p-6 sm:p-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-indigo-800 text-center">
          Choose Your Bingo Game
        </h1>

        <p className="text-lg text-gray-700 mb-6 text-center px-4">
          Select a bingo game format to get started!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
          {/* 1-90 Number Bingo */}
          <Link href="/play-bingo/90-ball" passHref>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 p-6 text-center">
              <h2 className="text-xl font-semibold text-indigo-600 mb-2">
                1-90 Number Bingo
              </h2>
              <p className="text-gray-600 mb-4">
                Generate printable 1-90 number bingo cards, perfect for parties
                and gatherings.
              </p>
              <button className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg">
                Play Now
              </button>
            </div>
          </Link>

          {/* 1-75 Number Bingo */}
          <Link href="/play-bingo/75-ball" passHref>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 p-6 text-center">
              <h2 className="text-xl font-semibold text-purple-600 mb-2">
                1-75 Number Bingo
              </h2>
              <p className="text-gray-600 mb-4">
                Enjoy classic 1-75 number bingo with friends and family. Great
                for social events!
              </p>
              <button className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg">
                Play Now
              </button>
            </div>
          </Link>
        </div>

        <footer className="mt-12 w-full text-center text-gray-600">
          <p>&copy; 2024 Bingozone.online. All rights reserved.</p>
          <p className="mt-2">Play responsibly. Must be 18+ to play.</p>
        </footer>
      </div>
    </div>
  );
};

export default PlayBingoOptionsPage;
