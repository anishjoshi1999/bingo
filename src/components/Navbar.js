"use client";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" passHref>
              <span className="text-2xl font-bold text-indigo-600">
                Lucky Stars Bingo
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex space-x-4">
              <Link href="/" passHref>
                <span className="text-gray-700 hover:text-indigo-600 cursor-pointer">
                  Home
                </span>
              </Link>
              <Link href="/bingo" passHref>
                <span className="text-gray-700 hover:text-indigo-600 cursor-pointer">
                  Create Cards 
                </span>
              </Link>
              <Link href="#" passHref>
                <span className="text-gray-700 hover:text-indigo-600 cursor-pointer">
                  About Us
                </span>
              </Link>
              <Link href="#" passHref>
                <span className="text-gray-700 hover:text-indigo-600 cursor-pointer">
                  Contact
                </span>
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" passHref>
            <span className="block text-gray-700 hover:text-indigo-600 cursor-pointer">
              Home
            </span>
          </Link>
          <Link href="/bingo" passHref>
            <span className="block text-gray-700 hover:text-indigo-600 cursor-pointer">
              Bingo Games
            </span>
          </Link>
          <Link href="/about" passHref>
            <span className="block text-gray-700 hover:text-indigo-600 cursor-pointer">
              About Us
            </span>
          </Link>
          <Link href="/contact" passHref>
            <span className="block text-gray-700 hover:text-indigo-600 cursor-pointer">
              Contact
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
