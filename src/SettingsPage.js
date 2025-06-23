// src/pages/SettingsPage.js
import React, { useState } from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [volume, setVolume] = useState(50);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="settings-page">
      <h1>⚙️ Settings</h1>

      <div className="setting-option">
        <label>
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
          />
          Enable Dark Mode
        </label>
      </div>

      <div className="setting-option">
        <label>Volume: {volume}%</label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={volume} 
          onChange={(e) => setVolume(e.target.value)} 
        />
      </div>

      <div className="setting-option">
        <label>
          <input 
            type="checkbox" 
            checked={notifications} 
            onChange={() => setNotifications(!notifications)} 
          />
          Enable Notifications
        </label>
      </div>

      <button className="save-button" onClick={handleSave}>
        💾 Save Settings
      </button>
    </div>
  );
};

export default SettingsPage;
