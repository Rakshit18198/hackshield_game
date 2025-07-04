import React, { useState } from 'react';
import './RoleSelectPage.css';
import { ShieldAlert, Bug, TerminalSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const roles = [
  {
    id: 'defender',
    title: 'Defender',
    icon: <ShieldAlert size={40} />,
    description: 'Protect systems from threats. Master firewalls, threat detection, and incident response.',
  },
  {
    id: 'hacker',
    title: 'Ethical Hacker',
    icon: <Bug size={40} />,
    description: 'Explore system vulnerabilities, exploit flaws ethically, and expose weak spots.',
  },
  {
    id: 'analyst',
    title: 'Analyst',
    icon: <TerminalSquare size={40} />,
    description: 'Analyze patterns, review logs, and uncover hidden breaches through investigation.',
  }
];

const RoleSelectPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (selectedRole) {
      // Save to user profile or global state
      console.log('Role selected:', selectedRole);
      navigate('/dashboard'); // Or wherever you want to go
    }
  };

  return (
    <div className="role-select-container">
      <h1>Choose Your Role</h1>
      <p className="role-subtitle">Select your specialization to begin your journey.</p>
      <div className="role-grid">
        {roles.map((role) => (
          <div
            key={role.id}
            className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
            onClick={() => setSelectedRole(role.id)}
          >
            <div className="role-icon">{role.icon}</div>
            <h3>{role.title}</h3>
            <p>{role.description}</p>
          </div>
        ))}
      </div>
      <button
        className="confirm-role-btn"
        onClick={handleConfirm}
        disabled={!selectedRole}
      >
        Confirm Role
      </button>
    </div>
  );
};

export default RoleSelectPage;
