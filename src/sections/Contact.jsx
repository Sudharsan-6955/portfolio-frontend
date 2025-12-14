// src/sections/Contact.jsx
import React, { useState, useContext } from "react";
import { ThemeContext } from '../App';
import ParticleBackground from "../components/ParticleBackground";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      const res = await fetch("https://portfolio-backend-pgcv.onrender.com/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message. Try again.");
      }
    } catch {
      setStatus("Network error. Try again.");
    }
  };
  const { darkMode } = useContext(ThemeContext);
  return (
    <section
      id="contact"
      className={`flex items-center justify-center py-16 relative min-h-screen overflow-hidden ${darkMode ? "bg-neutral-900" : "bg-white"}`}
      style={{
        background: darkMode ? "#18181b" : "#ffffff",
      }}
    >
      {/* Particle background as a background layer */}
      <ParticleBackground id="particles-contact" />
      
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-4 ${darkMode ? 'text-neutral-100' : 'text-gray-900'}`}>Get In Touch</h2>
        <p className={`text-center mb-12 text-base sm:text-lg ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>
          Have a project in mind? Let's connect and bring it to life.
        </p>

        <div className={`max-w-6xl flex flex-col md:flex-row items-start justify-between mx-auto gap-8 md:gap-12`}>
          <form onSubmit={handleSubmit} className="w-full md:w-1/2 flex-shrink-0">
            <style>{`
              .float-label-group {
                position: relative;
                margin-bottom: 1.5rem;
              }
              .float-label {
                position: absolute;
                left: 12px;
                top: 16px;
                pointer-events: none;
                color: #888;
                font-size: 1rem;
                transition: all 0.3s cubic-bezier(.45,.05,.55,.95);
              }
              .float-input:focus + .float-label,
              .float-input:not(:placeholder-shown) + .float-label {
                top: -8px;
                left: 8px;
                font-size: 0.85rem;
                color: #2563eb;
              }
              .float-input {
                transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
                border-bottom: 2px solid #d1d5db;
                background: transparent;
              }
              .float-input:focus {
                border-color: #2563eb;
                box-shadow: 0 2px 12px 0 rgba(37,99,235,0.10);
                background: rgba(37,99,235,0.03);
              }
              .float-textarea:focus + .float-label,
              .float-textarea:not(:placeholder-shown) + .float-label {
                top: -8px;
                left: 8px;
                font-size: 0.85rem;
                color: #2563eb;
              }
              .float-textarea {
                transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
                border-bottom: 2px solid #d1d5db;
                background: transparent;
                resize: none;
              }
              .float-textarea:focus {
                border-color: #2563eb;
                box-shadow: 0 2px 12px 0 rgba(37,99,235,0.10);
                background: rgba(37,99,235,0.03);
              }
            `}</style>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="float-label-group">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder=" "
                  className={`float-input mt-3 p-3 w-full outline-none rounded ${darkMode ? 'bg-neutral-800 text-neutral-100' : 'bg-white'}`}
                  required
                />
                <label className="float-label">Name</label>
              </div>
              <div className="float-label-group">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder=" "
                  className={`float-input mt-3 p-3 w-full outline-none rounded ${darkMode ? 'bg-neutral-800 text-neutral-100' : 'bg-white'}`}
                  required
                />
                <label className="float-label">Email</label>
              </div>
            </div>

            <div className="float-label-group mt-6">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder=" "
                rows="6"
                className={`float-textarea p-3 w-full outline-none rounded ${darkMode ? 'bg-neutral-800 text-neutral-100' : 'bg-white'}`}
                required
              ></textarea>
              <label className="float-label">Write a message...</label>
            </div>

            <button
              type="submit"
              className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto font-semibold"
            >
              Submit
            </button>
            {status && (
              <p className={`mt-4 text-sm font-medium ${status.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{status}</p>
            )}
          </form>

          {/* Contact Details */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 md:pl-8">
            <div className="space-y-2">
              <p className={`text-base leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-gray-700'}`}>
                Have a project in mind, a question, or an opportunity to collaborate?
              </p>
              <p className={`text-base leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-gray-700'}`}>
                I'm always open to discussing web development, APIs, and full-stack projects.
              </p>
              <p className={`text-base leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-gray-700'}`}>
                Feel free to reach out using the form — I'll get back to you as soon as possible.
              </p>
            </div>
            
            <div className={`mt-1 space-y-2 ${darkMode ? 'text-neutral-300' : 'text-gray-700'}`}>
              <div className="flex items-center gap-1">
                <div>
                  <p className="font-medium">Location</p>
                  <p className={darkMode ? 'text-neutral-400' : 'text-gray-600'}>Tirunelveli, India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium">Email</p>
                  <p className={darkMode ? 'text-neutral-400' : 'text-gray-600'}>sudharsan638294@gmail.com</p>
                </div>
              </div>
        
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
