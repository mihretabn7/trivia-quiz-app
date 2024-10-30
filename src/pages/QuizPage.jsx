
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { db } from '../utils/firebase';
// import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
// import './QuizPage.css';

// const Quiz = () => {
//   const { category } = useParams();
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [score, setScore] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(30);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [disableOptions, setDisableOptions] = useState(false);
//   const username = sessionStorage.getItem('username');
//   const [isFinishCalled, setIsFinishCalled] = useState(false);

//   useEffect(() => {
//     if (!category) {
//       setError('Category is not defined. Please select a valid category.');
//       setLoading(false);
//       return;
//     }

//     const fetchQuestions = async () => {
//       try {
//         setLoading(true);
//         const questionsRef = collection(db, 'questions');
//         const q = query(questionsRef, where('Category', '==', category));
//         const snapshot = await getDocs(q);

//         if (snapshot.empty) {
//           setError('No questions found for this category.');
//           return;
//         }

//         const fetchedQuestions = [];
//         snapshot.forEach((doc) => {
//           fetchedQuestions.push({ id: doc.id, ...doc.data() });
//         });

//         setQuestions(fetchedQuestions);
//         setTimeLeft(fetchedQuestions[0]?.timeLimit || 10);
//       } catch (err) {
//         setError('Failed to fetch questions. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [category]);

//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//       return () => clearTimeout(timerId);
//     } else {
//       handleNextQuestion();
//     }
//   }, [timeLeft]);

//   const handleSelectOption = (option) => {
//     setSelectedOption(option);
//     setDisableOptions(true);

//     const currentQuestion = questions[currentQuestionIndex];

//     if (option === currentQuestion['Correct Answer']) {
//       setScore(score + 1);
//     }

//     setTimeout(() => handleNextQuestion(), 1000);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setTimeLeft(questions[currentQuestionIndex + 1]?.timeLimit || 15);
//       setSelectedOption(null);
//       setDisableOptions(false);
//     } else {
//       setQuizCompleted(true);
//     }
//   };

//   const handleFinishQuiz = async (score) => {
//     if (isFinishCalled) return; 
//     setIsFinishCalled(true); 

//     try {
//       const leaderboardRef = collection(db, 'leaderboard');
//       await addDoc(leaderboardRef, {
//         username: username,
//         score: score,
//         category:category,
//       });
//       console.log(`User: ${username}, Score: ${score} saved to leaderboard.`);
//       navigate('/leaderboard');
//     } catch (error) {
//       console.error('Error saving score to leaderboard:', error);
//     }
//   };

//   useEffect(() => {
//     if (quizCompleted) {
//       handleFinishQuiz(score); // Call this function to handle the score saving and navigation
//     }
//   }, [quizCompleted, score]); // Added score to dependency array

//   if (loading) return <p className="loading">Loading questions...</p>;
//   if (error) return <p className="error">{error}</p>;

//   if (quizCompleted) {
//     return (
//       <div className="final-score-container">
//         <p className="final-score">Your final score is {score}/{questions.length}</p>
//       </div>
//     );
//   }

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <div className="quiz-container">
//       <h2 className="welcome-message">Welcome, {username}!</h2>
//       <h1 className="quiz-title">{category} Quiz</h1>

//       <div className="question-card">
//         <p className="question-text">{currentQuestion.Question}</p>

//         <div className="options">
//           <button
//             onClick={() => handleSelectOption(currentQuestion['Option A'])}
//             className={`option-button ${selectedOption === currentQuestion['Option A'] ? 'selected' : ''}`}
//             disabled={disableOptions}
//           >
//             {currentQuestion['Option A']}
//           </button>
//           <button
//             onClick={() => handleSelectOption(currentQuestion['Option B'])}
//             className={`option-button ${selectedOption === currentQuestion['Option B'] ? 'selected' : ''}`}
//             disabled={disableOptions}
//           >
//             {currentQuestion['Option B']}
//           </button>
//           <button
//             onClick={() => handleSelectOption(currentQuestion['Option C'])}
//             className={`option-button ${selectedOption === currentQuestion['Option C'] ? 'selected' : ''}`}
//             disabled={disableOptions}
//           >
//             {currentQuestion['Option C']}
//           </button>
//           <button
//             onClick={() => handleSelectOption(currentQuestion['Option D'])}
//             className={`option-button ${selectedOption === currentQuestion['Option D'] ? 'selected' : ''}`}
//             disabled={disableOptions}
//           >
//             {currentQuestion['Option D']}
//           </button>
//         </div>

//         <div className="timer">
//           <p>Time Left: {timeLeft} seconds</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quiz;
// src/pages/QuizPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../utils/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import './QuizPage.css';
import { ArrowLeft } from 'lucide-react'; // Import the arrow icon from lucide-react

const Quiz = () => {
  const { category } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [disableOptions, setDisableOptions] = useState(false);
  const username = sessionStorage.getItem('username');
  const [isFinishCalled, setIsFinishCalled] = useState(false);

  useEffect(() => {
    if (!category) {
      setError('Category is not defined. Please select a valid category.');
      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const questionsRef = collection(db, 'questions');
        const q = query(questionsRef, where('Category', '==', category));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setError('No questions found for this category.');
          return;
        }

        const fetchedQuestions = [];
        snapshot.forEach((doc) => {
          fetchedQuestions.push({ id: doc.id, ...doc.data() });
        });

        // Limit to a maximum of 10 questions
        setQuestions(fetchedQuestions.slice(0, 10));
        setTimeLeft(fetchedQuestions[0]?.timeLimit || 10);
      } catch (err) {
        setError('Failed to fetch questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      handleNextQuestion();
    }
  }, [timeLeft]);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setDisableOptions(true);

    const currentQuestion = questions[currentQuestionIndex];

    if (option === currentQuestion['Correct Answer']) {
      setScore(score + 1);
    }

    setTimeout(() => handleNextQuestion(), 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(questions[currentQuestionIndex + 1]?.timeLimit || 15);
      setSelectedOption(null);
      setDisableOptions(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleFinishQuiz = async (score) => {
    if (isFinishCalled) return; 
    setIsFinishCalled(true); 

    try {
      const leaderboardRef = collection(db, 'leaderboard');
      await addDoc(leaderboardRef, {
        username: username,
        score: score,
        category: category,
        
      });
      console.log(`User: ${username}, Score: ${score} saved to leaderboard.`);
      navigate('/leaderboard');
    } catch (error) {
      console.error('Error saving score to leaderboard:', error);
    }
  };

  useEffect(() => {
    if (quizCompleted) {
      handleFinishQuiz(score); // Call this function to handle the score saving and navigation
    }
  }, [quizCompleted, score]); // Added score to dependency array

  if (loading) return <p className="loading">Loading questions...</p>;
  if (error) return <p className="error">{error}</p>;

  if (quizCompleted) {
    return (
      <div className="final-score-container">
        <p className="final-score">Your final score is {score}/{questions.length}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate('/')}>
        <ArrowLeft size={24} /> {/* Arrow icon */}
      </button>

      <h2 className="welcome-message">Welcome, {username}!</h2>
      <h1 className="quiz-title">{category} Quiz</h1>

      <div className="question-card">
        <p className="question-text">{currentQuestion.Question}</p>

        <div className="options">
          <button
            onClick={() => handleSelectOption(currentQuestion['Option A'])}
            className={`option-button ${selectedOption === currentQuestion['Option A'] ? 'selected' : ''}`}
            disabled={disableOptions}
          >
            {currentQuestion['Option A']}
          </button>
          <button
            onClick={() => handleSelectOption(currentQuestion['Option B'])}
            className={`option-button ${selectedOption === currentQuestion['Option B'] ? 'selected' : ''}`}
            disabled={disableOptions}
          >
            {currentQuestion['Option B']}
          </button>
          <button
            onClick={() => handleSelectOption(currentQuestion['Option C'])}
            className={`option-button ${selectedOption === currentQuestion['Option C'] ? 'selected' : ''}`}
            disabled={disableOptions}
          >
            {currentQuestion['Option C']}
          </button>
          <button
            onClick={() => handleSelectOption(currentQuestion['Option D'])}
            className={`option-button ${selectedOption === currentQuestion['Option D'] ? 'selected' : ''}`}
            disabled={disableOptions}
          >
            {currentQuestion['Option D']}
          </button>
        </div>

        <div className="timer">
          <p>Time Left: {timeLeft} seconds</p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;