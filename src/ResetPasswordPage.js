import React, { useState } from 'react';
import './ResetPasswordPage.css';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Replace with backend request
    console.log(`Password reset email sent to: ${email}`);
    setSubmitted(true);
  };

  return (
    <div className="reset-wrapper">
      <h1>Reset Your Password</h1>
      <p>Enter your email to receive a reset link.</p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="reset-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Reset Link</button>
        </form>
      ) : (
        <div className="confirmation-message">
          ✅ A reset link has been sent to your email.
        </div>
      )}

      <button className="back-button" onClick={() => navigate('/login')}>
        Back to Login
      </button>
    </div>
  );
};

export default ResetPasswordPage;
