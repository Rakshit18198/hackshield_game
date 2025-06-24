// src/ForgotPasswordPage.js
import React, { useState } from 'react';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with actual API call
    console.log('Password reset link sent to:', email);
    setSubmitted(true);
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Your Password?</h2>
      {submitted ? (
        <p className="success-message">If an account with that email exists, a reset link has been sent.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Enter your email address:</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
