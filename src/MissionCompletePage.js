// src/pages/MissionCompletePage.js
import React from 'react';
import './MissionCompletePage.css';
import { useNavigate } from 'react-router-dom';

const MissionCompletePage = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/play');
  };

  const handleNext = () => {
    navigate('/missions');
  };

  return (
    <div className="mission-complete-container">
      <div className="complete-box">
        <h1 className="glow-title">🎉 Mission Complete!</h1>
        <p className="glow-subtext">You successfully exploited the vulnerability and secured the system.</p>

        <div className="summary">
          <p><strong>XP Gained:</strong> +150</p>
          <p><strong>Time Taken:</strong> 02:34</p>
          <p><strong>Difficulty:</strong> Intermediate</p>
        </div>

        <div className="button-group">
          <button className="btn replay" onClick={handleRetry}>🔁 Replay</button>
          <button className="btn next" onClick={handleNext}>➡️ Next Mission</button>
        </div>
      </div>
    </div>
  );
};

export default MissionCompletePage;
