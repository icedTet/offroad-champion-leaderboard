'use client';

import { useState } from 'react';
import Link from 'next/link';

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-md hover:bg-white/10 transition-colors"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={`block h-0.5 w-full bg-amber-400 transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-amber-400 transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-amber-400 transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#0E0A1B] border-l border-amber-400/20 z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-2 p-8 pt-20">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-amber-400 text-lg font-semibold py-3 px-4 rounded-md hover:bg-white/5 transition-colors"
          >
            Home
          </Link>
          <Link
            href="#daily"
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-amber-400 text-lg font-semibold py-3 px-4 rounded-md hover:bg-white/5 transition-colors"
          >
            Daily Leaderboard
          </Link>
          <Link
            href="#weekly"
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-amber-400 text-lg font-semibold py-3 px-4 rounded-md hover:bg-white/5 transition-colors"
          >
            Weekly Leaderboard
          </Link>
        </nav>
      </div>
    </>
  );
}
