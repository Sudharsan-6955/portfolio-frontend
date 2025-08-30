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
      className={`py-16 relative`}
      style={{
        background: darkMode
          ? "radial-gradient(circle, #18181b 60%, #27272a 100%)"
          : "radial-gradient(circle, white 60%, #c7c7f7 100%)",
      }}
    >
  <div className="container mx-auto px-4 sm:px-6">
        <h2 className={`text-3xl font-bold text-center mb-4 ${darkMode ? 'text-neutral-100' : 'text-gray-900'}`}>Get In Touch</h2>
        <p className={`text-center mb-12 ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>
          Have a project in mind? Let's connect and bring it to life.
        </p>

        <div className={`max-w-3xl flex flex-col md:flex-row items-center justify-between mx-auto py-8 gap-8 rounded-lg shado-md ${darkMode ? 'bg-neural-800' : 'bg-hite'}`}>
          <form onSubmit={handleSubmit} className="w-full md:w-2/3">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="float-label-group">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder=" "
                  className={`float-input mt-3 p-2 w-full outline-none ${darkMode ? 'bg-netral-800 text-neutral-100' : ''}`}
                  required
                />
                <label className="float-label ">Name</label>
              </div>
              <div className="float-label-group">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder=" "
                  className={`float-input mt-3 p-2 w-full outline-none ${darkMode ? 'bg-netral-800 text-neutral-100' : ''}`}
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
                rows="5"
                className={`float-textarea p-2 w-full outline-none ${darkMode ? 'bg-netral-800 text-neutral-100' : ''}`}
                required
              ></textarea>
              <label className="float-label">Write a message...</label>
            </div>

            <button
              type="submit"
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition w-full md:w-auto"
            >
              Submit
            </button>
            {status && (
              <p className="mt-4 text-center text-sm text-green-600">{status}</p>
            )}
          </form>

          {/* Contact Details */}
          <div className="mt-8 md:mt-0 md:w-1/3 text-center flex flex-col items-center justify-center">
            <p className={`${darkMode ? 'text-neutral-300' : 'text-gray-600'} break-all`}>Email: demo123@gmail.com</p>
            <p className={`${darkMode ? 'text-neutral-300' : 'text-gray-600'}`}>Phone: +91 1234567890</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
