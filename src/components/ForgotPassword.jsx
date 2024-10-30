import React, { useState } from 'react';
import { db } from '../utils/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Assuming you will create this CSS file

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (newPassword !== confirmPassword) {
            setMessage("Passwords don't match.");
            return;
        }

        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('username', '==', username.toLowerCase()));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userRef = doc(db, 'users', userDoc.id);

                // Update password in the Firestore database
                await updateDoc(userRef, { password: newPassword }); // Be careful with plain text passwords
                setMessage('Your password has been updated successfully.');

                // Optionally navigate back to the login page
                setTimeout(() => navigate('/'), 2000);
            } else {
                setMessage('User not found.');
            }
        } catch (error) {
            console.error('Error updating password: ', error);
            setMessage('Error updating password.');
        }
    };

    return (
        <div className="forgot-password-container">
            <h1>Reset Password</h1>
            <form onSubmit={handleResetPassword} className="forgot-password-form">
                <input 
                    type="text" 
                    placeholder="Enter your username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="input-field"
                />
                <input 
                    type="password" 
                    placeholder="New Password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="input-field"
                />
                <input 
                    type="password" 
                    placeholder="Confirm New Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="input-field"
                />
                <button type="submit" className="submit-button">Update Password</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default ForgotPassword;
