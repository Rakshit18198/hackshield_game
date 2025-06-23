// src/TutorialPage.js
import React from 'react';
import './TutorialPage.css';

const TutorialPage = () => {
  return (
    <div className="tutorial-container">
      <h1>🧠 HackShield Tutorial</h1>
      <div className="tutorial-section">
        <h2>🎯 Objective</h2>
        <p>Your mission is to solve cybersecurity challenges and outsmart virtual threats to climb the leaderboard.</p>
      </div>

      <div className="tutorial-section">
        <h2>🛠 Tools</h2>
        <ul>
          <li><strong>Terminal:</strong> Run basic commands to inspect systems.</li>
          <li><strong>Decoder:</strong> Break ciphers and find hidden data.</li>
          <li><strong>Firewall Scanner:</strong> Bypass obstacles and gain deeper access.</li>
        </ul>
      </div>

      <div className="tutorial-section">
        <h2>🕹 Gameplay Tips</h2>
        <ul>
          <li>Read instructions carefully before clicking anything.</li>
          <li>Use clues provided in dialogues or mission descriptions.</li>
          <li>Speed and accuracy both impact your final score.</li>
        </ul>
      </div>

      <div className="tutorial-end">
        <p>Ready to put your skills to the test?</p>
        <button onClick={() => window.location.href = "/missions"}>🚀 Start Your First Mission</button>
      </div>
    </div>
  );
};

export default TutorialPage;
