"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" passHref>
              <span className="text-2xl font-bold text-white">
                BingoZone.Online
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink href="/" text="Home" />
              <NavLink href="/play-bingo" text="Play Bingo" />
              {/* <NavLink href="/about" text="About Us" />
              <NavLink href="/contact" text="Contact" /> */}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/" text="Home" />
            <MobileNavLink href="/play-bingo" text="Play Bingo" />
            <MobileNavLink href="/about" text="About Us" />
            <MobileNavLink href="/contact" text="Contact" />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, text }) => (
  <Link href={href} passHref>
    <span className="text-white hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
      {text}
    </span>
  </Link>
);

const MobileNavLink = ({ href, text }) => (
  <Link href={href} passHref>
    <span className="text-white hover:bg-indigo-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
      {text}
    </span>
  </Link>
);

export default Navbar;