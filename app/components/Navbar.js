"use client";

import Link from "next/link";

export default function Navbar() {
  const handleLogoClick = (e) => {
    if (window.clearSearch) {
      window.clearSearch();
    }
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50 nav-background border-b border-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center space-x-2 group"
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:to-white transition-all duration-300">
            Beginners
          </h1>
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg border border-gray-700 transition-all duration-200 hover:border-gray-600"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
