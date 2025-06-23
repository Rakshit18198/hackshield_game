// src/pages/PlayPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PlayPage.css';

const missionData = {
  1: { title: 'Phishing Frenzy', question: 'Which of the following is a sign of a phishing email?', options: ['Free gift links', 'Proper grammar', 'Official domain', 'Secure logo'], correct: 0 },
  2: { title: 'Malware Mayhem', question: 'What does antivirus software detect?', options: ['Spam emails', 'Unauthorized access', 'Malicious code', 'Weak passwords'], correct: 2 },
  // Add more as needed
};

const PlayPage = () => {
  const { levelId } = useParams();
  const mission = missionData[levelId] || { title: "Unknown Mission", question: "", options: [] };

  const [selected, setSelected] = useState(null);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => t > 0 ? t - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    if (selected === null) return;
    if (selected === mission.correct) {
      alert('Correct! Mission Complete.');
      window.location.href = '/results';
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        alert('Game Over');
        window.location.href = '/results';
      } else {
        alert('Incorrect. Try again!');
      }
    }
  };

  return (
    <div className="play-page">
      <h1>{mission.title}</h1>
      <div className="hud">
        <span>🧠 Lives: {lives}</span>
        <span>⏱️ Time: {timeLeft}s</span>
      </div>
      <div className="question-box">
        <h2>{mission.question}</h2>
        <div className="options">
          {mission.options.map((opt, idx) => (
            <label key={idx} className={`option ${selected === idx ? 'selected' : ''}`}>
              <input
                type="radio"
                name="option"
                value={idx}
                onChange={() => setSelected(idx)}
              />
              {opt}
            </label>
          ))}
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default PlayPage;
