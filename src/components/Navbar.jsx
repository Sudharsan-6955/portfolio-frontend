import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-scroll";
import { ThemeContext } from '../App';

export default function Navbar() {
  // Set Home as active on initial load
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
  ];
  // Track active nav for underline
  const [activeNav, setActiveNav] = useState("home");

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full backdrop-blur-lg shadow-lg z-50  border-blue-100 bg-transparent`}
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)', fontFamily: 'Montserrat, sans-serif' }}
    >
      <style>{`
        .nav-underline {
          transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
          left: 0;
        }
        .nav-link:hover .nav-underline {
          width: 100% !important;
          opacity: 1 !important;
        }
      `}</style>
  <div className={`w-full max-w-screen-xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between ${darkMode ? 'text-white' : ''}`}>
        {/* Logo Left */}
        <div className="flex-1 flex items-center justify-start">
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-wide drop-shadow-lg">
            MyPortfolio
          </h1>
        </div>
        {/* Nav Center */}
        <div className="flex-1 flex items-center justify-center">
          <ul className="hidden md:flex space-x-10 text-md font-semibold items-center">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  smooth
                  duration={500}
                  offset={-80}
                  spy={true}
                  activeClass="nav-active"
                  className={`nav-link cursor-pointer px-3 py-2 rounded-lg hover:text-blue-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 relative ${activeNav === link.to ? 'text-blue-600' : ''}`}
                  onSetActive={() => setActiveNav(link.to)}
                >
                  <span className="relative inline-block">
                    {link.name}
                    <span
                      className={`nav-underline absolute bottom-0 h-[2px] bg-blue-600 ${activeNav === link.to || (activeNav === 'home' && link.to === 'home') ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
                      style={activeNav === 'home' && link.to === 'home' ? {width: '100%', opacity: 1, left: 0, right: 0, transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)'} : {}}
                    ></span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Buttons Right (desktop: only dark/light toggle) */}
        <div className="flex-1 flex items-center justify-end space-x-4">
          {/* Desktop Let's Talk button */}
          <Link to="contact" smooth duration={500} offset={-80} className="hidden md:block">
            <button
              className="px-8 py-2 rounded-full shadow-lg font-bold text-white bg-gradient-to-r from-blue-600 to-sky-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 hover:scale-105 hover:from-sky-400 hover:to-blue-600"
            >
              Let's Talk
            </button>
          </Link>
          {/* Dark/Light Mode Toggle Button */}
          <button
            className={`ml-2 p-2 rounded-full shadow transition-all duration-300 ${darkMode ? 'bg-neutral-800 text-gray-100 hover:bg-neutral-700' : 'bg-gray-200 text-yellow-500 hover:bg-gray-300'}`}
            aria-label="Toggle Dark Mode"
            onClick={() => setDarkMode(prev => !prev)}
          >
            {/* Sun/Moon Icon SVG - controlled by darkMode state */}
            {!darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path stroke="currentColor" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" />
                <path stroke="currentColor" strokeWidth="2" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.41-1.41M6.46 6.46L5.05 5.05m12.02 0l-1.41 1.41M6.46 17.54l-1.41 1.41" />
              </svg>
            )}
          </button>
          {/* Hamburger for mobile, right side */}
          <button
            className={`md:hidden flex flex-col space-y-1 p-2 rounded-lg ${darkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-blue-50 hover:bg-blue-100'} focus:outline-none focus:ring-2 focus:ring-blue-300`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span className={`w-8 h-0.5 ${darkMode ? 'bg-white' : 'bg-blue-700'} transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-8 h-0.5 ${darkMode ? 'bg-white' : 'bg-blue-700'} transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-8 h-0.5 ${darkMode ? 'bg-white' : 'bg-blue-700'} transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

  {/* ...existing code... */}

      {/* Mobile Menu: show nav links and Let's Talk button only on small devices */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-6 py-8 bg-white/90 backdrop-blur-lg shadow-2xl text-lg font-semibold rounded-b-2xl border-b border-blue-100 animate-fade-in">
          {navLinks.map((link) => (
            <li key={link.to} className="mobile-link w-full text-center">
              <Link
                to={link.to}
                smooth
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                activeClass="nav-active"
                className={`nav-link cursor-pointer px-4 py-3 rounded-lg hover:text-blue-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full block relative ${activeNav === link.to ? 'text-blue-600' : ''}`}
                onSetActive={() => setActiveNav(link.to)}
              >
                <span className="relative z-10">{link.name}</span>
                <span className={`nav-underline absolute left-0 bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeNav === link.to ? 'w-full' : 'w-0'}`}></span>
              </Link>
            </li>
          ))}
          <li className="mobile-link w-full text-center">
            <Link
              to="contact"
              smooth
              duration={500}
              offset={-80}
              onClick={() => setIsOpen(false)}
            >
              <button
                className="block md:hidden px-8 py-3 rounded-full shadow-lg font-bold text-white bg-gradient-to-r from-blue-600 to-sky-400 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full transition-all duration-300 hover:scale-105 hover:from-sky-400 hover:to-blue-600"
              >
                Let's Talk
              </button>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
