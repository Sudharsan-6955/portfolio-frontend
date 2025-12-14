// src/sections/About.jsx
import React, { useContext } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeContext } from '../App';
import ParticleBackground from "../components/ParticleBackground";
const About = () => {
    const { darkMode } = useContext(ThemeContext);
    // Parallax effect for About section
    // Use framer-motion for scroll-based parallax
    // Animate heading, paragraph, and icons
    return (
        <section
            id="about"
            className={`flex items-center justify-center relative overflow-hidden ${darkMode ? "bg-neutral-900" : "bg-white"} min-h-screen py-16`}
            style={{
                background: darkMode ? "#18181b" : "#ffffff",
            }}
        >
            {/* Particle background as a background layer */}
            <ParticleBackground id="particles-about" />
            {/* Animated Logos as background */}
            <div className="absolute inset-0 z-0 pointer-events-none hidden md:flex items-center justify-center">
                {/* JavaScript Logo - Official and More Visible, Animated Movement */}
                <motion.img
                    src="https://cdn.worldvectorlogo.com/logos/javascript-1.svg"
                    alt="JavaScript Logo"
                    className="absolute left-[45%] top-[12%] w-32 h-32 rounded-full bg-white p-2 shadow-lg border-4 border-yellow-400 opacity-60"
                    initial={{ scale: 0.7, rotate: 0, opacity: 0.2 }}
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 8, -8, 0], opacity: 0.2 }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                {/* React Logo */}
                <motion.img
                    src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
                    alt="React Logo"
                    className="absolute left-[10%] top-[20%] w-32 h-32 rounded-full bg-white p-2 shadow-lg border-4 border-blue-500 opacity-60"
                    initial={{ scale: 0.7, rotate: -10, opacity: 0.2 }}
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 12, -12, 0], opacity: 0.2 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                {/* HTML Logo */}
                <motion.img
                    src="https://cdn.worldvectorlogo.com/logos/html-1.svg"
                    alt="HTML Logo"
                    className="absolute left-[70%] top-[10%] w-28 h-28 rounded-full bg-white p-2 shadow-lg border-4 border-orange-500 opacity-60"
                    initial={{ scale: 0.7, rotate: 10, opacity: 0.2 }}
                    animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 10, 0], opacity: 0.2 }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                {/* Tailwind Logo */}
                <motion.img
                    src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg"
                    alt="Tailwind Logo"
                    className="absolute left-[20%] bottom-[10%] w-28 h-28 rounded-full bg-white p-2 shadow-lg border-4 border-cyan-400 opacity-60"
                    initial={{ scale: 0.7, rotate: 0, opacity: 0.2 }}
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 8, -8, 0], opacity: 0.2 }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                {/* NodeJS Logo */}
                <motion.img
                    src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg"
                    alt="NodeJS Logo"
                    className="absolute left-[60%] bottom-[15%] w-28 h-28 rounded-full bg-white p-2 shadow-lg border-4 border-green-500 opacity-60"
                    initial={{ scale: 0.7, rotate: 0, opacity: 0.2 }}
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0], opacity: 0.2 }}
                    transition={{ duration: 2.3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                {/* ExpressJS Logo */}
                <motion.img
                    src="https://cdn.worldvectorlogo.com/logos/express-109.svg"
                    alt="ExpressJS Logo"
                    className="absolute left-[40%] top-[70%] w-24 h-24 rounded-full bg-white p-2 shadow-lg border-4 border-gray-400 opacity-60"
                    initial={{ scale: 0.7, rotate: 0, opacity: 0.2 }}
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 6, -6, 0], opacity: 0.2 }}
                    transition={{ duration: 2.1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                {/* MongoDB Logo */}
                <motion.img
                    src="https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg"
                    alt="MongoDB Logo"
                    className="absolute left-[80%] top-[60%] w-24 h-24 rounded-full bg-white p-2 shadow-lg border-4 border-green-700 opacity-60"
                    initial={{ scale: 0.7, rotate: 0, opacity: 0.2 }}
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 8, -8, 0], opacity: 0.2 }}
                    transition={{ duration: 2.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
            </div>
            {/* Main content above background logo */}
            <motion.div
                className="w-full max-w-screen-xl mx-auto flex flex-col items-center justify-center relative z-10 px-4"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <motion.h3
                    className={`text-xl sm:text-2xl font-semibold mb-4 mt-4 ${darkMode ? 'text-neutral-100' : 'text-gray-900'}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    About me
                </motion.h3>
                <motion.h2
                    className={`text-5xl sm:text-6xl text-center md:text-7xl font-extrabold mb-4 ${darkMode ? 'text-neutral-100' : 'text-gray-900'}`}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Innovative <br />
                    coder for a{" "}
                    <span className="text-neutral-400">digital age</span>
                </motion.h2>
                <motion.p
                    className={`max-w-2xl mx-auto text-center mb-8 text-lg sm:text-xl ${darkMode ? 'text-neutral-400' : 'text-gray-700'}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    I build secure, scalable REST APIs using Node.js, with strong focus on authentication, authorization, and backend performance.
                </motion.p>
                {/* Skills Icons with parallax effect */}
                <motion.div
                    className="flex justify-center gap-8 py-4"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <motion.img
                        src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
                        alt="React"
                        className="w-14 h-14 bg-white rounded-full p-2 shadow"
                        whileHover={{ scale: 1.15, y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                    <motion.img
                        src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg"
                        alt="Node.js"
                        className="w-14 h-14 bg-white rounded-full p-2 shadow"
                        whileHover={{ scale: 1.15, y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                    <motion.img
                        src="https://cdn.worldvectorlogo.com/logos/express-109.svg"
                        alt="ExpressJS"
                        className="w-14 h-14 bg-white rounded-full p-2 shadow"
                        whileHover={{ scale: 1.15, y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                    <motion.img
                        src="https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg"
                        alt="MongoDB"
                        className="w-14 h-14 bg-white rounded-full p-2 shadow"
                        whileHover={{ scale: 1.15, y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default About;
