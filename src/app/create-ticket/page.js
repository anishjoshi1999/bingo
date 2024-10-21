"use client";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import { Hash, Clock, Award, Users, ArrowRight } from "lucide-react";

const BingoOptionsPage = () => {
  // SEO-optimized metadata
  const metaDescription = "Create and customize your perfect bingo game! Choose from classic 1-90 number bingo or traditional 1-75 ball bingo formats. Generate free printable bingo cards for parties, events, and gatherings. Start creating your personalized bingo game now!";
  const keywords = "create bingo cards, bingo generator, 90 ball bingo, 75 ball bingo, printable bingo cards, custom bingo cards, free bingo cards, bingo game maker, online bingo creator, party bingo cards";

  // Structured data for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Create Custom Bingo Cards | Choose Your Bingo Format | BingoZone.Online",
    "description": metaDescription,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "Product",
          "name": "1-90 Number Bingo",
          "description": "Generate printable 1-90 number bingo cards, perfect for parties and gatherings.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        },
        {
          "@type": "Product",
          "name": "1-75 Number Bingo",
          "description": "Classic 1-75 number bingo format for friends and family gatherings.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
      ]
    }
  };

  const bingoOptions = [
    {
      title: "1-90 Number Bingo",
      description: "Generate printable 1-90 number bingo cards, perfect for parties and gatherings. Includes automatic number calling and card validation.",
      features: ["90 numbers", "Multiple card layouts", "Print-ready PDF", "Auto number caller"],
      icon: <Hash className="w-8 h-8 text-indigo-600" />,
      href: "/create-ticket/90-ball",
      color: "indigo"
    },
    {
      title: "1-75 Number Bingo",
      description: "Enjoy classic 1-75 number bingo with friends and family. Features traditional 5x5 grid layout with FREE space in the center.",
      features: ["75 numbers", "5x5 grid layout", "FREE center space", "Classic format"],
      icon: <Award className="w-8 h-8 text-purple-600" />,
      href: "/create-ticket/75-ball",
      color: "purple"
    }
  ];

  return (
    <>
      <Head>
        <title>Create Custom Bingo Cards | Choose Your Bingo Format | BingoZone.Online</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Create Custom Bingo Cards | BingoZone.Online" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bingozone.online/create-ticket" />
        <link rel="canonical" href="https://bingozone.online/create-ticket" />
      </Head>

      <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-12">
          <section className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-indigo-800">
              Create Your Perfect Bingo Game
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Choose from our popular bingo formats and customize your game experience
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {bingoOptions.map((option, index) => (
              <Link href={option.href} key={index} className="group">
                <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 p-8">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 bg-${option.color}-50 rounded-lg mr-4`}>
                      {option.icon}
                    </div>
                    <h2 className={`text-2xl font-bold text-${option.color}-600`}>
                      {option.title}
                    </h2>
                  </div>

                  <p className="text-gray-600 mb-6 text-lg">
                    {option.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <Award className="w-5 h-5 mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className={`flex items-center justify-center w-full px-6 py-3 bg-${option.color}-600 text-white font-semibold rounded-xl group-hover:bg-${option.color}-700 transition-all duration-300`}>
                    Create Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Trust Indicators */}
          <section className="mt-16 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <Users className="w-6 h-6 text-indigo-600" />
                <span className="text-gray-700">50,000+ Active Players</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-6 h-6 text-indigo-600" />
                <span className="text-gray-700">Instant Card Generation</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Award className="w-6 h-6 text-indigo-600" />
                <span className="text-gray-700">4.8/5 User Rating</span>
              </div>
            </div>
          </section>

          <footer className="mt-16 text-center text-gray-600">
            <p className="font-medium">&copy; 2024 BingoZone.Online - All rights reserved.</p>
            <p className="mt-2 text-sm">Play responsibly. Must be 18+ to play.</p>
            <nav className="mt-4">
              <Link href="/terms" className="text-gray-600 hover:text-indigo-600 mx-2 transition-colors">Terms</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-indigo-600 mx-2 transition-colors">Privacy</Link>
              <Link href="/contact" className="text-gray-600 hover:text-indigo-600 mx-2 transition-colors">Contact</Link>
            </nav>
          </footer>
        </div>
      </main>
    </>
  );
};

export default BingoOptionsPage;