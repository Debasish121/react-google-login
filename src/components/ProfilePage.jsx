import React from 'react';
import './ProfilePage.css';

const ProfilePage = ({ user, onLogout }) => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <img className="profile-image" src={user.picture} alt="Profile" />
        <div className="profile-info">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>
        </div>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;