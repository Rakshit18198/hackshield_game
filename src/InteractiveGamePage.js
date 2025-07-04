// src/pages/InteractiveGamePage.js
import React, { useState } from 'react';
import './InteractiveGamePage.css';

const InteractiveGamePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Enter your credentials to access the system...');

  const handleLogin = () => {
    // Simulate a vulnerable backend
    if (username.includes("'") || password.includes("'")) {
      setMessage("🔥 Access Granted via SQL Injection! You've exploited the vulnerability.");
    } else {
      setMessage("⛔ Access Denied. Try again or think like a hacker.");
    }
  };

  return (
    <div className="game-container">
      <div className="terminal-box">
        <h2 className="terminal-title">🧠 HackShield Terminal</h2>
        <p className="terminal-msg">{message}</p>

        <input
          className="terminal-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="terminal-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="terminal-btn" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default InteractiveGamePage;
