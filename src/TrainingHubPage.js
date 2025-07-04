import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TrainingHubPage.css';
import { BrainCircuit, Terminal, ShieldCheck, BookOpen } from 'lucide-react';

const TrainingHubPage = () => {
  const navigate = useNavigate();

  const trainingModules = [
    {
      title: 'Interactive Tutorials',
      icon: <BookOpen size={32} />,
      description: 'Step-by-step lessons to learn key security concepts.',
      path: '/tutorial'
    },
    {
      title: 'Terminal Simulator',
      icon: <Terminal size={32} />,
      description: 'Practice command-line tasks in a safe environment.',
      path: '/simulator' // You can add this page later
    },
    {
      title: 'Security Challenges',
      icon: <ShieldCheck size={32} />,
      description: 'Test your skills with realistic mini scenarios.',
      path: '/dailychallenges'
    },
    {
      title: 'Quick Quizzes',
      icon: <BrainCircuit size={32} />,
      description: 'Answer questions to reinforce your learning.',
      path: '/quiz' // You can build this page next
    }
  ];

  return (
    <div className="traininghub-container">
      <h1>Training Hub</h1>
      <p className="tagline">Sharpen your skills before entering the real missions.</p>
      <div className="module-grid">
        {trainingModules.map((module, index) => (
          <div className="module-card" key={index}>
            <div className="module-icon">{module.icon}</div>
            <h3>{module.title}</h3>
            <p>{module.description}</p>
            <button onClick={() => navigate(module.path)}>Launch</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingHubPage;
