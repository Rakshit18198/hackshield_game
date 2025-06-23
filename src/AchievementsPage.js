// src/AchievementsPage.js
import React from 'react';
import './AchievementsPage.css';

const achievements = [
  { title: "First Hack Complete", description: "Completed your first mission.", unlocked: true },
  { title: "Firewall Bypasser", description: "Bypassed 3 firewalls.", unlocked: true },
  { title: "Code Breaker", description: "Solved 5 logic puzzles.", unlocked: false },
  { title: "Elite Agent", description: "Earned 5000 total points.", unlocked: false },
];

const AchievementsPage = () => {
  return (
    <div className="achievements-container">
      <h1>🏅 Achievements</h1>
      <div className="achievements-grid">
        {achievements.map((ach, index) => (
          <div
            key={index}
            className={`achievement-card ${ach.unlocked ? 'unlocked' : 'locked'}`}
          >
            <h2>{ach.title}</h2>
            <p>{ach.description}</p>
            <span className="status">
              {ach.unlocked ? '✅ Unlocked' : '🔒 Locked'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
