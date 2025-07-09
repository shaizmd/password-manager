import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full px-6 py-4 bg-white/30 backdrop-blur-md shadow-inner text-sm text-gray-800 flex justify-between items-center">
      <span>© 2025 PassOp. All rights reserved.</span>
      <div className="space-x-4">
        <a href="#" className="hover:text-cyan-700 transition-colors">Privacy</a>
        <a href="#" className="hover:text-cyan-700 transition-colors">Terms</a>
        <a href="#" className="hover:text-cyan-700 transition-colors">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
