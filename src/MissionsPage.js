// src/MissionsPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MissionsPage.css';

const missions = [
  { id: 1, title: 'Phishing Frenzy', description: 'Identify fake emails to stop phishing attacks.', difficulty: 'Easy' },
  { id: 2, title: 'Malware Mayhem', description: 'Avoid malicious downloads in a high-stakes challenge.', difficulty: 'Medium' },
  { id: 3, title: 'Password Panic', description: 'Test your password strength knowledge.', difficulty: 'Hard' },
  { id: 4, title: 'Firewall Fortress', description: 'Defend the network from cyber intrusions.', difficulty: 'Expert' },
];

const MissionsPage = () => {
  const navigate = useNavigate();

  const startMission = (id) => {
    navigate(`/play/${id}`);
  };

  return (
    <div className="missions-page">
      <h1 className="missions-title">Select Your Mission</h1>
      <div className="missions-grid">
        {missions.map((mission) => (
          <div key={mission.id} className="mission-card">
            <h2>{mission.title}</h2>
            <p>{mission.description}</p>
            <span className={`tag ${mission.difficulty.toLowerCase()}`}>
              {mission.difficulty}
            </span>
            <br />
            <button onClick={() => startMission(mission.id)}>Play</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionsPage;
