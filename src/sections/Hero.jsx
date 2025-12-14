// src/sections/Hero.jsx
import React, { useRef, useState, useEffect, useContext } from "react";
import { ThemeContext } from "../App";
// import useTypingAnimation from "./useTypingAnimation";
import { Typewriter } from 'react-simple-typewriter';
import ParticleBackground from "../components/ParticleBackground";

const Hero = () => {
  const heroRef = useRef(null);
  const imgRef = useRef(null);
  const [adminImage, setAdminImage] = useState(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const [skills, setSkills] = useState([]);
  useEffect(() => {
  fetch("https://portfolio-backend-pgcv.onrender.com/api/admin/skills")
      .then((res) => res.json())
      .then((data) => {
        let newSkills = [];
        if (data.skills) {
          newSkills = data.skills.split(",").map((s) => s.trim()).filter(Boolean);
        }
        setSkills(newSkills);
      })
      .catch(() => setSkills([]));
  }, []);
  // const typedRole = useTypingAnimation(skills, 80, 1200);

  useEffect(() => {
  fetch("https://portfolio-backend-pgcv.onrender.com/api/admin/profile")
      .then((res) => res.json())
      .then((data) => setAdminImage(data.image))
      .catch(() => setAdminImage(null));
  }, []);

  const { darkMode } = useContext(ThemeContext);
  return (
    <section
      ref={heroRef}
      id="home"
      className={`flex items-center justify-center relative overflow-hidden ${darkMode ? "bg-neutral-900" : "bg-white"} min-h-screen`}
      style={{
        background: darkMode ? "#18181b" : "#ffffff",
      }}
    >
      {/* Particle background as a background layer */}
      <ParticleBackground id="particles-hero" />

      {/* Centered container with same max width as Navbar */}
      <div
        className={`relative z-10 w-full max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center ${darkMode ? "text-neutral-100" : "text-gray-900"}`}
        style={{paddingLeft: '1rem', paddingRight: '1rem'}}
      >
            {/* Left Side: Headings, Buttons, Socials */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left px-4 sm:px-8 md:px-16 py-6 md:py-0">
              <h2
                ref={nameRef}
                className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-wide mb-4 mt-8 font-['Poppins']"
              >
                HII, I'M SUDHARASAN
              </h2>
              <h3
                ref={roleRef}
                className="text-base sm:text-lg md:text-2xl font-light min-h-[2.5rem] font-['Poppins'] mb-6"
              >
                {skills.length === 0 ? "Backend was loading" : (
                  <Typewriter
                    words={skills}
                    loop={1}
                    cursor
                    cursorStyle='|'
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={1200}
                  />
                )}
              </h3>
              <a
                href="#projects"
                className="cta-spotlight text-sm sm:text-base md:text-lg mb-6 min-w-[150px] max-w-[220px] px-6 py-1 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110 hover:-translate-y-1 cursor-pointer"
              >
                View My Work
              </a>
              <div className="flex space-x-4 mt-2 mb-4 md:ml-3 justify-center md:justify-start">
                <a href="https://github.com/Sudharsan-6955/sudharsan-6955" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-600 hover:text-indigo-600 text-2xl">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.21 1.18a11.2 11.2 0 0 1 2.93-.39c.99.01 1.99.13 2.93.39 2.23-1.49 3.21-1.18 3.21-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.7.42.36.8 1.09.8 2.2v3.26c0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/sudharsan-dev/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-600 hover:text-indigo-600 text-2xl">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm15.25 11.25h-3v-5.5c0-1.32-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.91v5.59h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z" /></svg>
                </a>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
              <div className="hidden sm:flex relative items-center justify-center">
                <style>{`
                  @keyframes smoothBounce {
                   0% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0); }
                  }
                  .smooth-bounce-img {
                    animation: smoothBounce 4.5s infinite cubic-bezier(.45,.05,.55,.95);
                  }
                `}</style>
                <img
                  ref={imgRef}
                  src={adminImage || "https://avatars.dicebear.com/api/bottts/boy.svg"}
                  alt="Admin Avatar"
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-72 md:h-72 bg-transparent rounded-b-full ease-in-out smooth-bounce-img"
                  style={{ display: 'block', background: 'transparent' }}
                />
              </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute inset-x-0 bottom-3 flex justify-center pointer-events-none">
              <span className="text-gray-500 text-4xl animate-bounce">ˇ</span>
            </div>
      </div>
    </section>
  );
};

export default Hero;
