// src/components/LoginModal.jsx
import React from 'react';
//import './LoginModal.css'; // Optional: CSS for styling the modal

const LoginModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Please Log In</h2>
        <p>You need to be logged in to play the game.</p>
        <button onClick={onClose}>Close</button>
        {/* You can add a login form or link to the login page here */}
      </div>
    </div>
  );
};

export default LoginModal;
