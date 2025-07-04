// src/pages/MissionDetailPage.js
import React from 'react';
import './MissionDetailPage.css';
import { useNavigate } from 'react-router-dom';

const MissionDetailPage = () => {
  const navigate = useNavigate();

  const handleStartMission = () => {
    navigate('/play'); // Redirect to actual mission gameplay
  };

  return (
    <div className="mission-detail-container">
      <div className="neon-box">
        <h1 className="mission-title">🔥 Mission: SQL Injection Defense</h1>
        <p className="mission-description">
          In this mission, you’ll face a vulnerable login system. Your task is to identify and exploit
          the flaw, then suggest how to fix it. Learn how attackers bypass authentication and how to secure forms.
        </p>

        <div className="mission-info">
          <p><strong>Difficulty:</strong> Intermediate</p>
          <p><strong>XP Reward:</strong> 150</p>
          <p><strong>Skills:</strong> SQL, Authentication, Input Validation</p>
        </div>

        <button className="start-btn" onClick={handleStartMission}>
          Begin Mission
        </button>
      </div>
    </div>
  );
};

export default MissionDetailPage;
