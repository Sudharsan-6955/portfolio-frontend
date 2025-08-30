// src/components/Footer.jsx
import React, { useContext } from "react";
import { Typewriter } from 'react-simple-typewriter';
import { ThemeContext } from '../App';

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <footer
      className={`border-t border-gray-300 py-8 relative`}
      style={{
        background: darkMode
          ? "radial-gradient(circle, #18181b 60%, #27272a 100%)"
          : "radial-gradient(circle, white 60%, #c7c7f7 100%)",
      }}
    >
          <style>{`
            @keyframes floatLogo {
              0% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0); }
            }
            .footer-logo-animate {
              animation: floatLogo 3s infinite ease-in-out;
              display: inline-block;
            }
          `}</style>
      <div className={`container mx-auto px-6 text-center ${darkMode ? 'text-neutral-400' : 'text-gray-700'}` }>
        
    {/* Logo / Name */}
        <h1 className={`footer-logo-animate text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}` }>
          <Typewriter
            words={['Sudharasan']}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1200}
          />
        </h1>
        
    {/* Navigation Links */}
  <div className={`flex justify-center gap-8 mt-4 font-medium ${darkMode ? 'text-neutral-100' : 'text-gray-600'}` }>
          <a href="#home" className={`transition ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Home</a>
          <a href="#about" className={`transition ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>About</a>
          <a href="#projects" className={`transition ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Projects</a>
          <a href="#contact" className={`transition ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-6">
            <style>{`
              .footer-social-animate {
                transition: transform 0.4s cubic-bezier(.45,.05,.55,.95), box-shadow 0.4s;
              }
              .footer-social-animate:hover {
                transform: scale(1.25) rotate(-8deg);
                box-shadow: 0 4px 16px 0 rgba(37,99,235,0.12);
                z-index: 1;
              }
            `}</style>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className={`footer-social-animate w-6 h-6 transition ${darkMode ? 'hover:brightness-150' : 'hover:opacity-80'}`} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" className={`footer-social-animate w-6 h-6 transition ${darkMode ? 'hover:brightness-150' : 'hover:opacity-80'}`} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="LinkedIn" className={`footer-social-animate w-6 h-6 transition ${darkMode ? 'hover:brightness-150' : 'hover:opacity-80'}`} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" className={`footer-social-animate w-6 h-6 transition ${darkMode ? 'hover:brightness-150' : 'hover:opacity-80'}`} />
            </a>
        </div>

    {/* Copyright */}
  <p className={`text-sm mt-6 ${darkMode ? 'text-neutral-400' : 'text-gray-500'}` }>
          © {new Date().getFullYear()} <a href="/admin" className="underline hover:text-blue-600 transition" style={{cursor: 'pointer'}}>Sudharasan</a>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
