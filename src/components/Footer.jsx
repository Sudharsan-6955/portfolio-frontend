// src/components/Footer.jsx
import React, { useContext } from "react";
import { ThemeContext } from '../App';

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
  <footer className={`border-t border-gray-300 py-8 ${darkMode ? 'bg-neutral-900' : 'bg-purple-100'}` }>
  <div className={`container mx-auto px-6 text-center ${darkMode ? 'text-neutral-400' : 'text-gray-700'}` }>
        
    {/* Logo / Name */}
  <h1 className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}` } >Sudharasan</h1>
        
    {/* Navigation Links */}
  <div className={`flex justify-center gap-8 mt-4 font-medium ${darkMode ? 'text-neutral-100' : 'text-gray-600'}` }>
          <a href="#home" className="hover:text-blue-600 transition">Home</a>
          <a href="#about" className="hover:text-blue-600 transition">About</a>
          <a href="#projects" className="hover:text-blue-600 transition">Projects</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-6">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-6 h-6 hover:opacity-80" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" className="w-6 h-6 hover:opacity-80" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="LinkedIn" className="w-6 h-6 hover:opacity-80" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" className="w-6 h-6 hover:opacity-80" />
          </a>
        </div>

    {/* Copyright */}
  <p className={`text-sm mt-6 ${darkMode ? 'text-neutral-400' : 'text-gray-500'}` }>
          © {new Date().getFullYear()} Sudharasan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
