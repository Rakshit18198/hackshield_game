import React, { useState } from 'react';
import './DeleteAccountPage.css';

const DeleteAccountPage = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setStatus(null);

    try {
      // Simulate API call delay
      await new Promise(res => setTimeout(res, 1500));

      // TODO: Replace with actual API call
      // await fetch('/api/delete-account', { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });

      setStatus('success');
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-container">
      <h1>Delete Account</h1>
      <p className="warning">
        Warning: Deleting your account is irreversible. All progress, achievements, and data will be permanently lost.
      </p>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={() => setConfirmed(!confirmed)}
        />
        I understand the consequences and wish to proceed.
      </label>

      <button
        onClick={handleDelete}
        disabled={!confirmed || loading}
        className="delete-btn"
      >
        {loading ? 'Deleting...' : 'Delete My Account'}
      </button>

      {status === 'success' && (
        <p className="success-msg">Your account has been successfully deleted. Goodbye!</p>
      )}
      {status === 'error' && (
        <p className="error-msg">Failed to delete your account. Please try again later.</p>
      )}
    </div>
  );
};

export default DeleteAccountPage;
