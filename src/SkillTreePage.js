import React from 'react';
import './SkillTreePage.css';

const skills = [
  { id: 'basics', name: 'Cyber Basics', status: 'completed' },
  { id: 'networking', name: 'Networking', status: 'unlocked', parent: 'basics' },
  { id: 'encryption', name: 'Encryption', status: 'locked', parent: 'networking' },
  { id: 'osint', name: 'OSINT', status: 'locked', parent: 'networking' },
  { id: 'websec', name: 'Web Security', status: 'locked', parent: 'basics' },
  { id: 'forensics', name: 'Forensics', status: 'locked', parent: 'websec' },
];

const SkillTreePage = () => {
  const getStatusClass = (status) => {
    if (status === 'completed') return 'skill-completed';
    if (status === 'unlocked') return 'skill-unlocked';
    return 'skill-locked';
  };

  return (
    <div className="skilltree-container">
      <h1>Skill Tree</h1>
      <p className="tree-desc">Track your progress and unlock new cybersecurity abilities.</p>

      <div className="skill-tree">
        {skills.map((skill, index) => (
          <div key={skill.id} className={`skill-node ${getStatusClass(skill.status)}`}>
            <p>{skill.name}</p>
            <div className="status-label">{skill.status}</div>
          </div>
        ))}

        {/* Simple visual lines between skills using absolute positioning */}
        <svg className="connector-lines">
          {skills.map((skill) => {
            if (!skill.parent) return null;
            const from = skills.find(s => s.id === skill.parent);
            if (!from) return null;
            const fromIndex = skills.indexOf(from);
            const toIndex = skills.indexOf(skill);
            return (
              <line
                key={`${from.id}-${skill.id}`}
                x1={(fromIndex + 1) * 140}
                y1={50}
                x2={(toIndex + 1) * 140}
                y2={150}
                stroke="#00ffff66"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default SkillTreePage;
