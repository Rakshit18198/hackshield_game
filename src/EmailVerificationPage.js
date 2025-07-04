import React, { useState } from 'react';
import './EmailVerificationPage.css'; // Optional CSS

const EmailVerificationPage = () => {
  const [resendStatus, setResendStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    setResendStatus(null);

    try {
      // Simulate API call
      await new Promise(res => setTimeout(res, 1500));

      // If real API, replace above with:
      // const response = await fetch('/api/resend-verification', { method: 'POST' });

      setResendStatus('success');
    } catch (err) {
      setResendStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verification-container">
      <h1>Email Verification</h1>
      <p>
        We've sent a verification link to your email. Please check your inbox and click the link to activate your account.
      </p>
      <p>If you haven't received the email, click the button below to resend it.</p>

      <button onClick={handleResend} disabled={loading}>
        {loading ? 'Resending...' : 'Resend Verification Email'}
      </button>

      {resendStatus === 'success' && <p className="success-msg">Verification email resent successfully!</p>}
      {resendStatus === 'error' && <p className="error-msg">Something went wrong. Please try again.</p>}
    </div>
  );
};

export default EmailVerificationPage;
