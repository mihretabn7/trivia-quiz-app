import React from 'react';
import './SettingsPage.css'; // New CSS file for styling

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <nav className="navbar">
        <h1 className="navbar-title">Settings</h1>
        <button className="logout-button">Logout</button>
      </nav>

      <div className="settings-container">
        {/* User Profile Settings */}
        <div className="settings-card">
          <h2>User Profile Settings</h2>
          <p>
            <strong>Username:</strong> User123<br />
            <strong>Email:</strong> user@example.com
          </p>
          <button className="edit-button">Edit Profile</button>
        </div>

        {/* Notification Settings */}
        <div className="settings-card">
          <h2>Notification Settings</h2>
          <label>
            <input type="checkbox" defaultChecked /> Email Notifications
          </label>
          <label>
            <input type="checkbox" defaultChecked /> SMS Notifications
          </label>
          <button className="save-button">Save Settings</button>
        </div>

        {/* Privacy Settings */}
        <div className="settings-card">
          <h2>Privacy Settings</h2>
          <p>
            <label>
              <input type="checkbox" defaultChecked /> Make Profile Public
            </label>
          </p>
          <button className="save-button">Save Changes</button>
        </div>

        {/* Account Settings */}
        <div className="settings-card">
          <h2>Account Settings</h2>
          <button className="delete-account-button">Delete Account</button>
        </div>

        {/* Security Settings */}
        <div className="settings-card">
          <h2>Security Settings</h2>
          <p>
            <strong>Change Password</strong>
            <button className="change-password-button">Change Password</button>
          </p>
          <p>
            <strong>Two-Factor Authentication:</strong>
            <label>
              <input type="checkbox" /> Enable
            </label>
          </p>
          <button className="save-button">Save Security Settings</button>
        </div>

        {/* Language Settings */}
        <div className="settings-card">
          <h2>Language Settings</h2>
          <select>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
          <button className="save-button">Save Language</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

