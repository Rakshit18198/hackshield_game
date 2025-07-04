import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MissionBriefingPage.css';

const MissionBriefingPage = () => {
  const navigate = useNavigate();

  // This would ideally come from props, global state, or route state
  const mission = {
    id: 1,
    title: 'Firewall Breach',
    image: '/assets/firewall-mission.jpg', // add this image to your public/assets/
    intro: 'A rogue AI has bypassed our perimeter defenses and corrupted several nodes.',
    objectives: [
      'Identify the entry point of the breach',
      'Patch the vulnerable ports',
      'Reinforce the firewall with new rules',
      'Report the security log'
    ],
    difficulty: 'Intermediate',
  };

  const handleStartMission = () => {
    navigate('/play', { state: { missionId: mission.id } });
  };

  return (
    <div className="briefing-container">
      <div className="briefing-card">
        <img src={mission.image} alt="Mission Visual" className="mission-image" />
        <h1>{mission.title}</h1>
        <p className="intro">{mission.intro}</p>
        <h3>Objectives</h3>
        <ul className="objective-list">
          {mission.objectives.map((obj, index) => (
            <li key={index}>✔ {obj}</li>
          ))}
        </ul>
        <p className="difficulty">Difficulty: <strong>{mission.difficulty}</strong></p>
        <button className="start-btn" onClick={handleStartMission}>Start Mission</button>
      </div>
    </div>
  );
};

export default MissionBriefingPage;
