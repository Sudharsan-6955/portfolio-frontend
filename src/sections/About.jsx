// src/sections/About.jsx
import React, { useContext } from "react";
import { ThemeContext } from '../App';

const About = () => {
    const { darkMode } = useContext(ThemeContext);
    return (
        <section
            id="about"
            className={`h-screen py-16 text-center bg-gradient-to-b ${darkMode ? 'from-neutral-900 to-neutral-800' : 'from-white to-indigo-100'}`}
        >
            <h3 className={`text-lg font-medium mb-4 mt-10 ${darkMode ? 'text-neutral-100' : 'text-gray-900'}`}>About me</h3>

            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-neutral-100' : 'text-gray-900'}` }>
                Innovative <br />
                coder for a{" "}
                <span className="text-neutral-400">digital age</span>
            </h2>

            <p className={`max-w-2xl mx-auto mb-10 ${darkMode ? 'text-neutral-400' : 'text-gray-700'}` }>
                I’m a front-end developer skilled in React.js, focused on building clean,
                responsive, and user-friendly web interfaces with strong attention to performance
                and usability.
            </p>

            {/* Skills Icons */}
            <div className="flex justify-center gap-6">
                <img
                    src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg"
                    alt="Tailwind"
                    className="w-14 h-14 bg-white rounded-full p-2 shadow"
                />
                <img
                    src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg"
                    alt="Node.js"
                    className="w-14 h-14 bg-white rounded-full p-2 shadow"
                />
                <img
                    src="https://cdn.worldvectorlogo.com/logos/jquery-4.svg"
                    alt="jQuery"
                    className="w-14 h-14 bg-white rounded-full p-2 shadow"
                />
                <img
                    src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
                    alt="React"
                    className="w-14 h-14 bg-white rounded-full p-2 shadow"
                />
            </div>
        </section>
    );
};

export default About;
