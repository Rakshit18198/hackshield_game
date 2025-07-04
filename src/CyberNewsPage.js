import React, { useState, useEffect } from 'react';
import './CyberNewsPage.css';

const mockNews = [
  {
    title: 'New Zero-Day Vulnerability Found in Major VPN Provider',
    source: 'CyberSecurityToday',
    date: 'June 28, 2025',
    summary: 'Researchers discovered a critical flaw that allows remote code execution in a widely used VPN service.',
    link: '#'
  },
  {
    title: 'Ransomware Attack Disrupts UK University Networks',
    source: 'InfoSec Weekly',
    date: 'June 27, 2025',
    summary: 'A sophisticated ransomware campaign forced the university to shut down email, portals, and servers.',
    link: '#'
  },
  {
    title: 'Tips for Staying Secure During Summer Travel',
    source: 'HackAware Blog',
    date: 'June 25, 2025',
    summary: 'Don’t let your guard down on vacation — here are the best practices for keeping your devices safe.',
    link: '#'
  }
];

const CyberNewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Replace with API fetch if available
    setNews(mockNews);
  }, []);

  return (
    <div className="news-container">
      <h1>Cyber News</h1>
      <p className="tagline">Stay up to date with the latest in cybersecurity.</p>
      <div className="news-list">
        {news.map((item, index) => (
          <div key={index} className="news-card">
            <h3>{item.title}</h3>
            <p className="meta">{item.source} — {item.date}</p>
            <p>{item.summary}</p>
            <a href={item.link} className="read-more" target="_blank" rel="noopener noreferrer">
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CyberNewsPage;
