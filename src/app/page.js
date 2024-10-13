"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-100 to-purple-200 p-6 sm:p-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-indigo-800 text-center">
          Welcome to Lucky Stars Bingo
        </h1>

        <p className="text-lg text-gray-700 mb-6 text-center px-4">
          Join us for an exciting game of bingo! Create your card and start
          playing today!
        </p>

        <div className="space-y-4 w-full max-w-lg">
          <Link href="/create-ticket" passHref>
            <button className="w-full px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105">
              Create Bingo Card
            </button>
          </Link>

          <Link href="/fetch-ticket" passHref>
            <button className="w-full px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105">
              Get Bingo Card
            </button>
          </Link>

          <Link href="/play-bingo" passHref>
            <button className="w-full px-6 py-3 bg-pink-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105">
              Play Bingo
            </button>
          </Link>
        </div>

        <footer className="mt-12 w-full text-center text-gray-600">
          <p>&copy; 2024 Lucky Stars Bingo. All rights reserved.</p>
          <p className="mt-2">Play responsibly. Must be 18+ to play.</p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
