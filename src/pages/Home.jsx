// // src/components/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Network, Book, Globe, Music, Film, Paintbrush, Brain } from 'lucide-react';
import LoginModal from './LoginModal'; // Import the LoginModal component
import './Home.css'; // Ensure to have the correct CSS file

const quizCategories = [
  { name: 'Networking', icon: <Network size={48} />, color: '#FFB6C1' },
  { name: 'History', icon: <Globe size={48} />, color: '#87CEEB' },
  { name: 'Politics', icon: <Book size={48} />, color: '#FF6347' },
  { name: 'Art', icon: <Paintbrush size={48} />, color: '#8A2BE2' },
  { name: 'Literature', icon: <Book size={48} />, color: '#20B2AA' },
  { name: 'Movies', icon: <Film size={48} />, color: '#FFA07A' },
  { name: 'Music', icon: <Music size={48} />, color: '#FFD700' },
  { name: 'Random', icon: <Brain size={48} />, color: '#32CD32' },
];

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const username = sessionStorage.getItem('username'); // Check if the user is logged in

  const handleCategoryClick = (category) => {
    if (!username) {
      setIsModalOpen(true); // Show modal if user is not logged in
    } else {
      navigate(`/quiz/${category}`); // Navigate to the quiz page with the selected category
    }
  };

  return (
    <div className="home-container">
      <h1>Trivia Games</h1>
      <p>Browse our collection of trivia games and find one suitable for your knowledge level!</p>
      <div className="quiz-categories">
        {quizCategories.map((category, index) => (
          <div 
            key={index} 
            className="quiz-card" 
            onClick={() => handleCategoryClick(category.name)} 
            style={{ backgroundColor: category.color }}
          >
            {category.icon}
            <h2>{category.name}</h2>
          </div>
        ))}
      </div>

      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />} {/* Show modal if needed */}
    </div>
  );
};

export default Home;
