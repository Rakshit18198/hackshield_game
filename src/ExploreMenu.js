// src/components/ExploreMenu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ExploreMenu.css';

const ExploreMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <div className="explore-container">
      <button className="explore-button" onClick={toggleMenu}>
        ☰ Explore
      </button>

      {open && (
        <div className="explore-dropdown">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/missions">Missions</Link>
          <Link to="/play">Game</Link>
          <Link to="/complete">Completion</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/achievements">Achievements</Link>
          <Link to="/tutorial">Tutorial</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/support">Support</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/dailychallenges">Daily Challenges</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/notification">Notifications</Link>
        </div>
      )}
    </div>
  );
};

export default ExploreMenu;
