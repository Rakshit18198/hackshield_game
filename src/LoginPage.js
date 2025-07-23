// src/pages/LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Optionally persist login (remember me)
      if (remember) {
        localStorage.setItem("rememberMe", "true");
      }

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.error || "Login failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to HackShield</h2>

        {error && <p className="error">{error}</p>}

        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="form-options">
          <label className="remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember Me
          </label>
          <a href="/forgot-password" className="forgot">
            Forgot Password?
          </a>
        </div>

        <button type="submit">Login</button>

        <p className="redirect">
          New here? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
