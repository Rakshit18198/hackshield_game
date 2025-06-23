// src/LeaderboardPage.js
import React from 'react';
import './LeaderboardPage.css';

const leaderboardData = [
  { username: 'CyberAce01', score: 3200, rank: 1 },
  { username: 'HackHero', score: 2950, rank: 2 },
  { username: 'AgentZero', score: 2800, rank: 3 },
  { username: 'FirewallFox', score: 2500, rank: 4 },
  { username: 'BitNinja', score: 2300, rank: 5 },
];

const LeaderboardPage = () => {
  return (
    <div className="leaderboard-container">
      <h1>🏆 Global Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry) => (
            <tr key={entry.rank}>
              <td>{entry.rank}</td>
              <td>{entry.username}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
