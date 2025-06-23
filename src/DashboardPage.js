// src/DashboardPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();

  // Example stats – replace with real data as needed
  const username = "CyberAgentX";
  const score = 2450;
  const levelsCompleted = 5;
  const badges = 3;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">
        Welcome back, <span>{username}</span>
      </h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>Score</h2>
          <p>{score}</p>
        </div>
        <div className="stat-card">
          <h2>Levels Completed</h2>
          <p>{levelsCompleted}</p>
        </div>
        <div className="stat-card">
          <h2>Badges Earned</h2>
          <p>{badges}</p>
        </div>
      </div>

      <div className="dashboard-buttons">
        <button onClick={() => navigate('/missions')}>
          🚀 Start New Mission
        </button>
        <button onClick={() => navigate('/leaderboard')}>
          🏆 View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
