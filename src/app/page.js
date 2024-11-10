"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Head from "next/head"; // For adding meta tags

const HomePage = () => {
  return (
    <>
      <Head>
        {/* Page Title */}
        <title>
          Play Bingo Online - Create Bingo Cards and Play Bingo at BingoZone
        </title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Join BingoZone for an exciting game of bingo online. Create your bingo card and start playing today. The best place to play bingo online and enjoy endless fun!"
        />

        {/* Keywords */}
        <meta
          name="keywords"
          content="play bingo online, bingo card, bingo game, online bingo, bingozone, bingo free"
        />

        {/* Robots Meta Tag */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags for Social Media Sharing */}
        <meta property="og:title" content="Play Bingo Online - BingoZone" />
        <meta
          property="og:description"
          content="Join BingoZone for an exciting game of bingo online. Create your bingo card and start playing today!"
        />
        <meta property="og:image" content="/path-to-your-image.jpg" />
        <meta property="og:url" content="https://www.bingozone.online" />

        {/* Canonical URL for SEO */}
        <link rel="canonical" href="https://www.bingozone.online" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Structured Data (JSON-LD) for enhanced search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "WebSite",
              name: "BingoZone",
              url: "https://www.bingozone.online",
              description:
                "Play bingo online at BingoZone. Create and play bingo cards easily and have fun!",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.bingozone.online/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-100 to-purple-200 p-6 sm:p-12">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-indigo-800 text-center">
          Welcome to BingoZone.Online - Play Bingo Online
        </h1>

        {/* Subheading with Keyword Inclusion */}
        <p className="text-lg text-gray-700 mb-6 text-center px-4">
          Join us for an exciting game of bingo! Create your bingo card and
          start playing today. The best place to play bingo online!
        </p>

        {/* CTA Buttons with Descriptive Anchor Text */}
        <div className="space-y-4 w-full max-w-lg">
          <Link href="/create-ticket" passHref>
            <button
              className="w-full px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
              aria-label="Create Bingo Card"
            >
              Create Bingo Card
            </button>
          </Link>

          <Link href="/play-bingo" passHref>
            <button
              className="w-full px-6 py-3 bg-pink-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105"
              aria-label="Play Bingo"
            >
              Play Bingo
            </button>
          </Link>
        </div>

        {/* Footer with Legal Text */}
        <footer className="mt-12 w-full text-center text-gray-600">
          <p>&copy; 2024 Bingozone.online. All rights reserved.</p>
          <p className="mt-2">
            Play responsibly. Must be 18+ to play bingo online.
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
