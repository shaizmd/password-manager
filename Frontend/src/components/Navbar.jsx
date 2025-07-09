import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 w-full px-6 py-4 bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-sm text-gray-800 flex items-center justify-between">
      
      {/* Left: Logo + Brand */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 bg-gradient-to-br from-lime-400/40 to-cyan-400/40 rounded-xl flex items-center justify-center text-lime-600 font-bold shadow-lg backdrop-blur-sm border border-white/30 hover:scale-105 transition-transform duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-lime-300/20 to-cyan-300/20 rounded-xl blur-sm"></div>
          <span className="relative text-lg">🔐</span>
        </div>
        <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-gray-800 via-cyan-700 to-lime-700 bg-clip-text text-transparent hover:from-cyan-600 hover:to-lime-600 transition-all duration-300">
          <span className="text-cyan-600">&lt;/</span>PassOP<span className="text-lime-600">&gt;</span>
        </h1>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-sm font-medium">
        <a href="#" className="relative text-gray-700 hover:text-cyan-600 transition-all duration-300 group">
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-lime-500 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="#" className="relative text-gray-700 hover:text-cyan-600 transition-all duration-300 group">
          About
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-lime-500 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="#" className="relative text-gray-700 hover:text-cyan-600 transition-all duration-300 group">
          Tools
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-lime-500 group-hover:w-full transition-all duration-300"></span>
        </a>
      </div>

      {/* Hamburger for Mobile */}
      <div className="md:hidden z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none relative w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/10 to-lime-200/10 rounded-lg"></div>
          <svg
            className={`w-5 h-5 text-gray-800 transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu (Glass Dropdown) */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/30 backdrop-blur-md border-t border-white/20 shadow-md px-6 py-6 md:hidden z-40 rounded-b-2xl animate-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col space-y-4 text-sm font-medium text-gray-800">
            <a href="#" className="relative py-2 px-4 rounded-lg hover:bg-white/20 hover:text-cyan-600 transition-all duration-300 group backdrop-blur-sm">
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/20 to-lime-100/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="#" className="relative py-2 px-4 rounded-lg hover:bg-white/20 hover:text-cyan-600 transition-all duration-300 group backdrop-blur-sm">
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/20 to-lime-100/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="#" className="relative py-2 px-4 rounded-lg hover:bg-white/20 hover:text-cyan-600 transition-all duration-300 group backdrop-blur-sm">
              <span className="relative z-10">Tools</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/20 to-lime-100/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;