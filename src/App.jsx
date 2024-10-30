
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import Register from './components/Register';
import Login from './components/Login';
import './App.css'; // Styles for your vibrant theme
import UserProfile from './pages/UserProfile';
import QuizSelectionPage from './pages/QuizSelectionPage';
import SettingsPage from './pages/SettingsPage';
import QuizManagementPage from './pages/QuizManagementPage';
import ReportsPage from './pages/ReportsPage';
import UserManagementPage from './pages/UserManagementPage';
import Leaderboard from './pages/LeaderBoard';
import ForgotPassword from './components/ForgotPassword';
import { UserProvider } from './UserContext'; // Import UserProvider

const App = () => {
  return (
    <UserProvider>
    <Router>
      <div className="app-container"> {/* Container for overall styling */}
        <Navbar />
        <main className="main-content"> {/* Main content area */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz-selection" element={<QuizSelectionPage />} /> {/* Quiz Selection Page */}
            <Route path="/quiz/:category" element={<QuizPage />} /> {/* Quiz Page with quizType */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/users" element={<UserManagementPage />} />
            <Route path="/admin/quizzes" element={<QuizManagementPage />} />
            <Route path="/admin/reports" element={<ReportsPage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>
      </div>
    </Router>
    </UserProvider>
  );
};

export default App;

