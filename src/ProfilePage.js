import React, { useState, useEffect } from 'react';
import './ProfilePage.css'; // Optional external CSS for styling

const ProfilePage = () => {
  // Replace with real user data from context or API
  const [user, setUser] = useState({
    username: 'cyber_learner',
    email: 'user@example.com',
    avatarUrl: 'https://api.dicebear.com/6.x/thumbs/svg?seed=cyber',
    bio: 'Aspiring cybersecurity expert!',
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Submit updated profile to API
    setUser(formData);
    setEditing(false);
    alert('Profile updated!');
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-card">
        <img src={user.avatarUrl} alt="Avatar" className="profile-avatar" />
        <div className="profile-details">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={!editing}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editing}
          />
          <label>Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>
        <div className="profile-buttons">
          {editing ? (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)}>Edit Profile</button>
              <button onClick={() => alert('Redirect to Change Password Page')}>Change Password</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
