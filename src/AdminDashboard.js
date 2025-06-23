// src/AdminDashboard.js
import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">🛡 Admin Dashboard</h1>

      <div className="admin-grid">
        <div className="admin-card">
          <h2>Total Users</h2>
          <p>142</p>
        </div>
        <div className="admin-card">
          <h2>Active Sessions</h2>
          <p>27</p>
        </div>
        <div className="admin-card">
          <h2>Reports Submitted</h2>
          <p>19</p>
        </div>
        <div className="admin-card">
          <h2>Missions Completed</h2>
          <p>341</p>
        </div>
      </div>

      <div className="admin-actions">
        <button onClick={() => alert("Redirecting to user management...")}>👥 Manage Users</button>
        <button onClick={() => alert("Redirecting to reports...")}>📑 View Reports</button>
        <button onClick={() => alert("Redirecting to content settings...")}>⚙️ Game Settings</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
