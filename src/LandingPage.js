import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleExploreClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="landing-wrapper">
      {/* Explore stays top-right */}
      <button className="explore-button" onClick={handleExploreClick}>
        Explore
      </button>

      {/* Explore menu */}
      {showMenu && (
        <div className="explore-menu">
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/missions')}>Missions</button>
          <button onClick={() => navigate('/play')}>Play</button>
          <button onClick={() => navigate('/complete')}>Completion</button>
          <button onClick={() => navigate('/leaderboard')}>Leaderboard</button>
          <button onClick={() => navigate('/achievements')}>Achievements</button>
          <button onClick={() => navigate('/tutorial')}>Tutorial</button>
          <button onClick={() => navigate('/faq')}>FAQ</button>
          <button onClick={() => navigate('/support')}>Support</button>
          <button onClick={() => navigate('/admin')}>Admin Dashboard</button>
          <button onClick={() => navigate('/settings')}>Settings</button>
          <button onClick={() => navigate('/inventory')}>Inventory</button>
          <button onClick={() => navigate('/dailychallenges')}>Daily Challenges</button>
          <button onClick={() => navigate('/shop')}>Shop</button>
          <button onClick={() => navigate('/notifications')}>Notifications</button>
          <button onClick={() => navigate('/mission-detail')}>Mission Detail </button>
          <button onClick={() => navigate('/mission-complete')}>Mission Complete </button>
          <button onClick={() => navigate('/interactive')}>Interactive Game </button>
          <button onClick={() => navigate('/code-challenge')}>Code Challenge </button>
          <button onClick={() => navigate('/delete-account')}>DeleteAccountPage </button>
          <button onClick={() => navigate('/email-verification')}>Emailverification page </button>
          <button onClick={() => navigate('/mission-briefing')}>Mission Briefing Page </button>
          <button onClick={() => navigate('/profile')}>ProfilePage </button>
          <button onClick={() => navigate('/quiz')}>QuizPage </button>
          <button onClick={() => navigate('/role-select')}>RoleSelectPage </button>
          <button onClick={() => navigate('/skill-tree')}>SkillTreePage </button>
          <button onClick={() => navigate('/terminal-sim')}>TerminalSimPage </button>
          <button onClick={() => navigate('/training-hub')}>TrainingHubPage </button>
        </div>
      )}

      {/* Main Heading */}
      <h1>HackShield</h1>
      <p>Your cybersecurity adventure starts now!</p>

      {/* Login & Register buttons below the content */}
      <div className="bottom-buttons">
        <button className="nav-button" onClick={() => navigate('/login')}>Login</button>
        <button className="nav-button" onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
};

export default LandingPage;
