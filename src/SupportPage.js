// src/SupportPage.js
import React, { useState } from 'react';
import './SupportPage.css';

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent! ✅");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="support-container">
      <h1>🛠 Need Help?</h1>
      <p className="support-subtext">Fill out the form below and our support team will get back to you shortly.</p>
      <form className="support-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">📨 Submit</button>
      </form>
    </div>
  );
};

export default SupportPage;
