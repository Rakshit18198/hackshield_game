// src/GamePlayPage.js
import React, { useState } from 'react';
import './GamePlayPage.css';

const GamePlayPage = () => {
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');

  const handleRun = () => {
    if (input.trim().toLowerCase() === "scan") {
      setOutput("🟢 Scan complete. No threats found.");
    } else if (input.trim().toLowerCase() === "inject") {
      setOutput("⚠️ Intrusion attempt detected. Mission failed.");
    } else {
      setOutput("❔ Unknown command. Try 'scan' or 'inject'.");
    }
  };

  return (
    <div className="gameplay-container">
      <h1>🧠 Cyber Mission: Terminal Simulation</h1>
      <div className="terminal-box">
        <div className="terminal-output">
          <p>{output}</p>
        </div>
        <input
          type="text"
          placeholder="Type a command..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRun()}
        />
        <button onClick={handleRun}>Run</button>
      </div>
    </div>
  );
};

export default GamePlayPage;
