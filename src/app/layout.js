import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";

// Import global styles
import "./globals.css";

// Load custom fonts locally
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap", // Ensure smooth font loading
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap", // Ensure smooth font loading
});

// Metadata for SEO
export const metadata = {
  title: "BingoZone - Play Bingo Online",
  description:
    "Play Bingo Online at BingoZone. Create your bingo cards and start playing today!",
  keywords:
    "bingo, play bingo online, bingo cards, online bingo, bingozone, bingo game",
  author: "BingoZone",
  robots: "index, follow", // Instruct search engines to index the page
  openGraph: {
    title: "BingoZone - Play Bingo Online",
    description:
      "Create and play bingo cards at BingoZone. Join the fun and play bingo online!",
    url: "https://www.bingozone.online",
    image: "/images/bingo-image.jpg", // Add a representative image
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
