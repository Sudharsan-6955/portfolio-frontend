// src/sections/Contact.jsx
import React, { useState, useContext } from "react";
import { ThemeContext } from '../App';

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
      const res = await fetch("http://localhost:5000/api/messages/send", {
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
  <section className={`py-16 bg-gradient-to-b ${darkMode ? 'from-neutral-900 to-neutral-800' : 'from-white to-purple-100'}`} id="contact">
      <div className="container mx-auto px-6">
  <h2 className={`text-3xl font-bold text-center mb-4 ${darkMode ? 'text-neutral-100' : 'text-gray-900'}`}>Get In Touch</h2>
  <p className={`text-center mb-12 ${darkMode ? 'text-neutral-400' : 'text-gray-600'}` }>
          Have a project in mind? Let's connect and bring it to life.
        </p>

  <div className={`max-w-3xl mx-auto p-8 rounded-lg shadow-md ${darkMode ? 'bg-neutral-800' : 'bg-white'}` }>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className={`border-b border-gray-300 focus:border-blue-500 outline-none p-2 ${darkMode ? 'bg-neutral-800 text-neutral-100 placeholder-neutral-400' : ''}`}
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className={`border-b border-gray-300 focus:border-blue-500 outline-none p-2 ${darkMode ? 'bg-neutral-800 text-neutral-100 placeholder-neutral-400' : ''}`}
                required
              />
            </div>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write a message..."
              rows="5"
              className={`w-full border-b border-gray-300 focus:border-blue-500 outline-none p-2 mt-6 ${darkMode ? 'bg-neutral-800 text-neutral-100 placeholder-neutral-400' : ''}`}
              required
            ></textarea>

            <button
              type="submit"
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Submit
            </button>
            {status && (
              <p className="mt-4 text-center text-sm text-green-600">{status}</p>
            )}
          </form>

          {/* Contact Details */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">Email: demo123@gmail.com</p>
            <p className="text-gray-600">Phone: +91 1234567890</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
