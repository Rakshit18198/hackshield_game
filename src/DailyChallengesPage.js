// src/pages/DailyChallengesPage.js
import React from 'react';
import './DailyChallengesPage.css';

const challenges = [
  { id: 1, title: 'Block 3 phishing attempts', reward: '50 XP', completed: false },
  { id: 2, title: 'Complete 1 encryption puzzle', reward: '75 XP', completed: true },
  { id: 3, title: 'Visit the Cyber Vault', reward: '30 XP', completed: false },
];

const DailyChallengesPage = () => {
  return (
    <div className="challenges-container">
      <h1>🔥 Daily Challenges</h1>
      <ul className="challenge-list">
        {challenges.map(challenge => (
          <li key={challenge.id} className={`challenge-item ${challenge.completed ? 'completed' : ''}`}>
            <span className="challenge-title">{challenge.title}</span>
            <span className="challenge-reward">{challenge.reward}</span>
            {challenge.completed ? <span className="status done">✔ Completed</span> : <button className="start-btn">Start</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyChallengesPage;
