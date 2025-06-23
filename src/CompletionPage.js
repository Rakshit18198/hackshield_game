// src/CompletionPage.js
import React from 'react';
import './CompletionPage.css';
import { useNavigate } from 'react-router-dom';

const CompletionPage = ({ success = true, score = 150 }) => {
  const navigate = useNavigate();

  const message = success
    ? "🎉 Mission Accomplished!"
    : "💥 Mission Failed. Try Again!";

  const details = success
    ? `Great job! You earned ${score} points and unlocked a new badge.`
    : `You can retry the mission or review your previous attempts.`;

  return (
    <div className={`completion-container ${success ? 'success' : 'fail'}`}>
      <h1>{message}</h1>
      <p>{details}</p>

      <div className="completion-buttons">
        <button onClick={() => navigate('/missions')}>Back to Missions</button>
        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        {!success && (
          <button onClick={() => navigate('/game')}>Retry Mission</button>
        )}
      </div>
    </div>
  );
};

export default CompletionPage;
