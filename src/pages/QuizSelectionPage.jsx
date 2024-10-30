import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Globe, Film, Music, Users, Code, Award,Brain } from 'lucide-react';
import './QuizSelectionPage.css';

const QuizSelectionPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    // Save quiz name and username to session storage
    sessionStorage.setItem('quizName', quizName);
    sessionStorage.setItem('username', username);
    
    // Navigate to the quiz page
    navigate('/quiz');
  };

  const quizOptions = [
    { name: 'History', icon: <Book size={32} /> },
    { name: 'Politics', icon: <Globe size={32} /> },
    { name: 'Movies', icon: <Film size={32} /> },
    { name: 'Music', icon: <Music size={32} /> },
    { name: 'Networking', icon: <Users size={32} /> },
    { name: 'Art', icon: <Award size={32} /> },
    { name: 'Sports', icon: <Code size={32} /> },
    { name: 'Random', icon: <Code size={32} /> },
  ];

  // Function to navigate to quiz page
  const handleQuizSelection = (quizType) => {
    navigate(`/quiz/${quizType}`);
  };

  return (
    <div className="quiz-selection-container" onClick={handleClick}>
      <h1>Select a Quiz Type</h1>
      <div className="quiz-card-container">
        {quizOptions.map((option) => (
          <div
            key={option.name}
            className="quiz-card"
            onClick={() => handleQuizSelection(option.name)}
          >
            <div className="quiz-icon">{option.icon}</div>
            <h2>{option.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizSelectionPage;
