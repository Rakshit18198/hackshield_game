// src/LandingPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleExploreMenu = () => setShowMenu(!showMenu);
  const handleStartMission = () => navigate('/tutorial');
  const handleJoin = () => navigate('/register');

  const primaryRoutes = [
    { label: 'Login', path: '/login' },
    { label: 'Register', path: '/register' },
    { label: 'Tutorial', path: '/tutorial' },
    { label: 'Missions', path: '/missions' },
    { label: 'Dashboard', path: '/dashboard' },
  ];

  const exploreRoutes = [
    { label: 'Achievements', path: '/achievements' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Support', path: '/support' },
    { label: 'Admin Dashboard', path: '/admin' },
    { label: 'Settings', path: '/settings' },
    { label: 'Inventory', path: '/inventory' },
    { label: 'Daily Challenges', path: '/dailychallenges' },
    { label: 'Shop', path: '/shop' },
    { label: 'Notifications', path: '/notifications' },
    { label: 'Mission Detail', path: '/mission-detail' },
    { label: 'Interactive Game', path: '/interactive' },
    { label: 'Code Challenge', path: '/code-challenge' },
    { label: 'Delete Account', path: '/delete-account' },
    { label: 'Email Verification', path: '/email-verification' },
    { label: 'Mission Briefing', path: '/mission-briefing' },
    { label: 'Profile Page', path: '/profile' },
    { label: 'Role Select', path: '/role-select' },
    { label: 'Skill Tree', path: '/skill-tree' },
    { label: 'Terminal Sim', path: '/terminal-sim' },
    { label: 'Training Hub', path: '/training-hub' },
  ];

  return (
    <div className="landing-wrapper">
      <button className="explore-button" onClick={toggleExploreMenu}>
        {showMenu ? 'Close Explore' : 'Explore'}
      </button>

      {showMenu && (
        <div className="explore-menu">
          {exploreRoutes.map((item) => (
            <button
              key={item.path}
              className="explore-item"
              onClick={() => {
                setShowMenu(false);
                navigate(item.path);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <div className="landing-container">
        <h1 className="main-title">⚔️ HackShield</h1>
        <p className="subtitle">
          Defend the digital realm. Your cybersecurity adventure starts now.
        </p>

        <div className="intro-text">
          <p>
            The world is under attack by an elite hacker syndicate known as{' '}
            <strong>Black Ice</strong>. As a new recruit of{' '}
            <strong>HackShield</strong>, it’s your duty to uncover threats,
            master the digital battlefield, and rise through the ranks to stop
            a global cyber catastrophe.
          </p>
        </div>

        <div className="button-group">
          <button className="btn-primary" onClick={handleStartMission}>
            🎮 Start Mission
          </button>
          <button className="btn-secondary" onClick={handleJoin}>
            🚀 Join as Recruit
          </button>
        </div>

        <div className="navbar">
          {primaryRoutes.map((item) => (
            <button key={item.path} onClick={() => navigate(item.path)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
