// src/NotFoundPage.js
import React from 'react';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">Oops! The page you’re looking for doesn’t exist.</p>
      <button onClick={() => window.location.href = "/"}>
        ⬅️ Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
