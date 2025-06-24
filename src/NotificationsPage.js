// src/NotificationsPage.js
import React from 'react';
import './NotificationsPage.css';

const NotificationsPage = () => {
  const notifications = [
    { id: 1, message: '🎯 New mission available: "Firewall Frenzy"', time: '2 hours ago' },
    { id: 2, message: '🏆 You earned a badge: "Phishing Buster"', time: 'Yesterday' },
    { id: 3, message: '🛡️ Your account was updated with 200 coins', time: '3 days ago' },
    { id: 4, message: '📦 New item in the Shop: "AI Defender"', time: 'Last week' },
  ];

  return (
    <div className="notifications-container">
      <h1>🔔 Notifications</h1>
      <ul className="notifications-list">
        {notifications.map((note) => (
          <li key={note.id} className="notification-item">
            <p>{note.message}</p>
            <span>{note.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
