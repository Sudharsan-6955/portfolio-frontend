import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://portfolio-backend-pgcv.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        // Clear previous auth markers
        localStorage.removeItem("adminToken");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("adminExpires");

        // If server returned a token, save it and its expiry (if available)
        if (data && data.token) {
          localStorage.setItem("adminToken", data.token);
          // Try to extract exp from token payload (base64url)
          try {
            const parts = data.token.split(".");
            if (parts.length >= 2) {
              const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
              const padded = b64 + (b64.length % 4 ? "=".repeat(4 - (b64.length % 4)) : "");
              const json = decodeURIComponent(
                atob(padded)
                  .split("")
                  .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                  .join("")
              );
              const payload = JSON.parse(json);
              if (payload && payload.exp) {
                localStorage.setItem("adminExpires", String(payload.exp * 1000));
              } else {
                // fallback: set 1 minute expiry
                localStorage.setItem("adminExpires", String(Date.now() + 60 * 1000));
              }
            } else {
              localStorage.setItem("adminExpires", String(Date.now() + 60 * 1000));
            }
          } catch {
            localStorage.setItem("adminExpires", String(Date.now() + 60 * 1000));
          }
        } else {
          // No token from server: set temporary isAdmin flag that expires in 1 minute
          localStorage.setItem("isAdmin", "true");
          localStorage.setItem("adminExpires", String(Date.now() + 60 * 1000));
        }

        onLogin && onLogin();
        navigate("/admin");
        return;
      }

      // Failure: clear any stale auth markers
      localStorage.removeItem("adminToken");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("adminExpires");
      setError(data?.message || "Login failed");
    } catch (err) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("adminExpires");
      setError("Network error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded">
          Login
        </button>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
