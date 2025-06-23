// src/LandingPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="landing-container">
      <div className="explore-wrapper">
        <button className="explore-toggle" onClick={() => setShowMenu(!showMenu)}>
          🌐 {showMenu ? "Hide Explore" : "Explore"}
        </button>
        {showMenu && (
          <div className="explore-menu">
            <ul>
              <li><Link to="/">Landing</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/missions">Missions</Link></li>
              <li><Link to="/play">GamePlay</Link></li>
              <li><Link to="/complete">Completion</Link></li>
              <li><Link to="/leaderboard">Leaderboard</Link></li>
              <li><Link to="/achievements">Achievements</Link></li>
              <li><Link to="/tutorial">Tutorial</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/admin">Admin Dashboard</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to="/inventory">Inventory</Link></li>
              <li><Link to="/dailychallenges">Daily Challenges</Link></li>
            </ul>
          </div>
        )}
      </div>

      <h1 className="title">🛡️ HackShield</h1>
      <p className="subtitle">Gamifying Cybersecurity Education</p>

      <div className="button-group">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </div>
    </div>
  );
};

export default LandingPage;
