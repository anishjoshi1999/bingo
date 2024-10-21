"use client";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import { Users, Gift, Star, Clock, Shield } from "lucide-react";

const HomePage = () => {
  const metaDescription = "Play free online bingo games at BingoZone.Online! Create custom bingo cards, join multiplayer rooms, and win exciting prizes. Perfect for virtual game nights, educational activities, and family entertainment. Start playing bingo online today!";
  const keywords = "online bingo, free bingo games, virtual bingo, bingo cards, multiplayer bingo, create bingo cards, download bingo cards, bingo generator, play bingo online, bingo games for adults, family bingo games, educational bingo";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BingoZone.Online",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "description": metaDescription,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  };

  const features = [
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Multiplayer Rooms",
      description: "Join live games with players worldwide"
    },
    {
      icon: <Gift className="w-8 h-8 text-indigo-600" />,
      title: "100% Free",
      description: "No hidden costs or subscriptions required"
    },
    {
      icon: <Star className="w-8 h-8 text-indigo-600" />,
      title: "Custom Cards",
      description: "Create personalized bingo cards"
    },
    {
      icon: <Clock className="w-8 h-8 text-indigo-600" />,
      title: "Instant Play",
      description: "No downloads or installations needed"
    }
  ];

  return (
    <>
      <Head>
        <title>Play Free Online Bingo Games | Create & Download Bingo Cards | BingoZone.Online</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Play Free Online Bingo Games | BingoZone.Online" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bingozone.online" />
        <link rel="canonical" href="https://bingozone.online" />
      </Head>

      <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <main className="flex flex-col min-h-screen">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 p-6 sm:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <div className="space-y-6 mb-12">
              <h1 className="text-5xl sm:text-7xl font-bold text-indigo-800 tracking-tight">
                Play Free Online
                <span className="block pb-5 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
                  Bingo Games
                </span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-medium text-gray-700 max-w-3xl mx-auto">
                Create, Download, and Play Bingo Cards Online
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/create-ticket" className="group">
                <button className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                  Create & Download Cards
                  <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
                </button>
              </Link>
              <Link href="/play-bingo" className="group">
                <button className="px-8 py-4 bg-pink-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                  Play Now
                  <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
                </button>
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-indigo-100 rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Banner */}
        <section className="bg-white py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-center space-x-8">
              <Shield className="w-6 h-6 text-indigo-600" />
              <p className="text-gray-600 text-sm">
                Trusted by 50,000+ players worldwide • 4.8/5 average rating • Secure gameplay
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 text-center text-gray-600 p-8">
          <div className="max-w-6xl mx-auto">
            <p className="font-medium">&copy; 2024 BingoZone.Online - Free Online Bingo Games</p>
            <p className="mt-2 text-sm">Play responsibly. Must be 18+ to play.</p>
            <nav className="mt-6">
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/terms" className="text-gray-600 hover:text-indigo-600 transition-colors">Terms of Service</Link>
                <Link href="/privacy" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy Policy</Link>
                <Link href="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact Us</Link>
              </div>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
};

export default HomePage;