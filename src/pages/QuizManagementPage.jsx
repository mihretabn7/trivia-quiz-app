
// import React, { useState, useEffect } from 'react';
// import { db } from '../utils/firebase';
// import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
// import * as XLSX from 'xlsx'; // Import the xlsx library
// import './QuizManagementPage.css'; // Import the CSS file for consistent styling

// const CreateQuizPage = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [quizTitle, setQuizTitle] = useState('');
//   const [question, setQuestion] = useState('');
//   const [options, setOptions] = useState(['', '', '', '']);
//   const [correctAnswer, setCorrectAnswer] = useState('');
//   const [category, setCategory] = useState('');
//   const [difficulty, setDifficulty] = useState('');
//   const [error, setError] = useState('');
//   const [file, setFile] = useState(null);
//   const [questionsList, setQuestionsList] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

//   const fetchQuestions = async () => {
//     const questionsRef = collection(db, 'questions');
//     const snapshot = await getDocs(questionsRef);
//     const questionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setQuestionsList(questionsData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!quizTitle || !question || !options.every(opt => opt) || !correctAnswer || !category || !difficulty) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     try {
//       const questionsRef = collection(db, 'questions');
//       await addDoc(questionsRef, {
//         quizTitle,
//         question,
//         options,
//         correctAnswer,
//         category,
//         difficulty,
//       });
//       // Reset the form after submission
//       setQuizTitle('');
//       setQuestion('');
//       setOptions(['', '', '', '']);
//       setCorrectAnswer('');
//       setCategory('');
//       setDifficulty('');
//       setError('');
//       alert('Question added successfully!');
//       fetchQuestions(); // Refresh the questions list after adding
//     } catch (error) {
//       console.error('Error adding question: ', error);
//       setError('Failed to add question.');
//     }
//   };

//   const handleUpdateQuestion = (question) => {
//     setCurrentQuestion(question); // Set the current question to be edited
//     setIsEditing(true); // Open the editing form
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     const questionRef = doc(db, 'questions', currentQuestion.id);
    
//     // Log the current question to check its structure
//     console.log('Current Question before update:', currentQuestion);
    
//     try {
//       // Exclude the "No." field from the update
//       const { No, id, ...updatedData } = currentQuestion; // Destructure to exclude "No." and keep id
//       console.log('Updated Data:', updatedData); // Log the updated data to ensure "No." is excluded
      
//       await updateDoc(questionRef, updatedData); // Use updatedData for the update
//       alert('Question updated successfully!');
//       fetchQuestions(); // Refresh the questions list after update
//       setIsEditing(false); // Close the editing form
//       setCurrentQuestion(null); // Clear the current question
//     } catch (error) {
//       console.error('Error updating question: ', error);
//       alert('Failed to update question.');
//     }
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFile(file);
//     }
//   };

//   const handleExcelUpload = async () => {
//     if (!file) {
//       alert('Please select a file to upload.');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);

//       try {
//         const questionsRef = collection(db, 'questions');
//         for (const item of jsonData) {
//           await addDoc(questionsRef, item);
//         }
//         alert('Questions uploaded successfully!');
//         fetchQuestions(); // Refresh the questions list after upload
//       } catch (error) {
//         console.error('Error uploading questions: ', error);
//         alert('Failed to upload questions.');
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   // Pagination Logic
//   const indexOfLastQuestion = currentPage * rowsPerPage;
//   const indexOfFirstQuestion = indexOfLastQuestion - rowsPerPage;
//   const currentQuestions = questionsList.slice(indexOfFirstQuestion, indexOfLastQuestion);
//   const totalPages = Math.ceil(questionsList.length / rowsPerPage);

//   return (
//     <div className="create-quiz-container">
//       <h1 className="create-quiz-title">Create a Quiz</h1>
//       <form onSubmit={isEditing ? handleUpdateSubmit : handleSubmit} className="create-quiz-form">
//         <h2>{isEditing ? 'Update Question' : 'Create a Quiz'}</h2>
//         <input
//           type="text"
//           value={isEditing ? currentQuestion.Question : question}
//           onChange={(e) => isEditing ? setCurrentQuestion({ ...currentQuestion, Question: e.target.value }) : setQuestion(e.target.value)}
//           placeholder="Enter the quiz question"
//           required
//         />
//         <input
//           type="text"
//           value={isEditing ? currentQuestion['Option A'] : options[0]}
//           onChange={(e) => isEditing ? setCurrentQuestion({ ...currentQuestion, 'Option A': e.target.value }) : handleOptionChange(0, e.target.value)}
//           placeholder="Option A"
//           required
//         />
//         <input
//           type="text"
//           value={isEditing ? currentQuestion['Option B'] : options[1]}
//           onChange={(e) => isEditing ? setCurrentQuestion({ ...currentQuestion, 'Option B': e.target.value }) : handleOptionChange(1, e.target.value)}
//           placeholder="Option B"
//           required
//         />
//         <input
//           type="text"
//           value={isEditing ? currentQuestion['Option C'] : options[2]}
//           onChange={(e) => isEditing ? setCurrentQuestion({ ...currentQuestion, 'Option C': e.target.value }) : handleOptionChange(2, e.target.value)}
//           placeholder="Option C"
//           required
//         />
//         <input
//           type="text"
//           value={isEditing ? currentQuestion['Option D'] : options[3]}
//           onChange={(e) => isEditing ? setCurrentQuestion({ ...currentQuestion, 'Option D': e.target.value }) : handleOptionChange(3, e.target.value)}
//           placeholder="Option D"
//           required
//         />
//         <input
//           type="text"
//           value={isEditing ? currentQuestion['Correct Answer'] : correctAnswer}
//           onChange={(e) => isEditing ? setCurrentQuestion({ ...currentQuestion, 'Correct Answer': e.target.value }) : setCorrectAnswer(e.target.value)}
//           placeholder="Correct Answer"
//           required
//         />
//         <select
//           value={isEditing ? currentQuestion.Category : category}
//           onChange={(e) => isEditing ? setCurrentQuestion({ ...currentQuestion, Category: e.target.value }) : setCategory(e.target.value)}
//           required
//         >
//           <option value="">Select Category</option>
//           <option value="Networking">Networking</option>
//           <option value="History">History</option>
//           <option value="Politics">Politics</option>
//           <option value="Art">Art</option>
//           <option value="Literature">Literature</option>
//           <option value="Movies">Movies</option>
//           <option value="Music">Music</option>
//           <option value="Sports">Sports</option>
//           <option value="Random">Random</option>
//         </select>
//         <button type="submit">{isEditing ? 'Update Question' : 'Add Question'}</button>
//         {isEditing && <button type="button" onClick={() => { setIsEditing(false); setCurrentQuestion(null); }}>Cancel</button>}
//       </form>

//       {/* File Upload Section */}
//       <div className="upload-section">
//         <h2>Upload Questions from Excel</h2>
//         <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
//         <button onClick={handleExcelUpload} className="upload-button">Upload Questions</button>
//       </div>

//       {/* Questions Table */}
//       <h2>Questions List</h2>
//       {questionsList.length > 0 ? (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Question</th>
//               <th>Options</th>
//               <th>Correct Answer</th>
//               <th>Category</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentQuestions.map((question) => {
//               const optionsArray = [
//                 question['Option A'],
//                 question['Option B'],
//                 question['Option C'],
//                 question['Option D'],
//               ].filter(option => option);

//               return (
//                 <tr key={question.id}>
//                   <td>{question.Question}</td>
//                   <td>{optionsArray.length > 0 ? optionsArray.join(', ') : 'No options available'}</td>
//                   <td>{question['Correct Answer']}</td>
//                   <td>{question.Category}</td>
//                   <td>
//                     <button onClick={() => handleUpdateQuestion(question)}>Update</button>
//                     <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       ) : (
//         <p>No questions available. Please add some questions.</p>
//       )}

//       {/* Pagination Controls */}
//       <div className="pagination">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button key={index} onClick={() => setCurrentPage(index + 1)}>
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CreateQuizPage;
import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import * as XLSX from 'xlsx'; // Import the xlsx library
import './QuizManagementPage.css'; // Import the CSS file for consistent styling

const CreateQuizPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [quizTitle, setQuizTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [questionsList, setQuestionsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchQuestions = async () => {
    const questionsRef = collection(db, 'questions');
    const snapshot = await getDocs(questionsRef);
    const questionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setQuestionsList(questionsData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quizTitle || !question || !options.every(opt => opt) || !correctAnswer || !category || !difficulty) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const questionsRef = collection(db, 'questions');
      await addDoc(questionsRef, {
        quizTitle,
        question,
        options,
        correctAnswer,
        category,
        difficulty,
      });
      // Reset the form after submission
      setQuizTitle('');
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
      setCategory('');
      setDifficulty('');
      setError('');
      alert('Question added successfully!');
      fetchQuestions(); // Refresh the questions list after adding
    } catch (error) {
      console.error('Error adding question: ', error);
      setError('Failed to add question.');
    }
  };

  const handleUpdateQuestion = (question) => {
    setCurrentQuestion(question); // Set the current question to be edited
    setIsEditing(true); // Open the editing form
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const questionRef = doc(db, 'questions', currentQuestion.id);
    
    console.log('Current Question before update:', currentQuestion);
  
    try {
      // Filter out fields with special characters
      const updatedData = Object.entries(currentQuestion).reduce((acc, [key, value]) => {
        if (!key.includes('.') && key !== 'No.') { // exclude keys with '.' or "No."
          acc[key] = value;
        }
        return acc;
      }, {});
  
      console.log('Updated Data (filtered):', updatedData);
  
      if (Object.keys(updatedData).length === 0) {
        throw new Error('No valid fields to update.');
      }
  
      await updateDoc(questionRef, updatedData);
      alert('Question updated successfully!');
  
      fetchQuestions(); // Refresh the questions list after update
      setIsEditing(false); // Close the editing form
      setCurrentQuestion(null); // Clear the current question
    } catch (error) {
      console.error('Error updating question:', error.message);
      alert(`Failed to update question: ${error.message}`);
    }
  };
  
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleExcelUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      try {
        const questionsRef = collection(db, 'questions');
        for (const item of jsonData) {
          await addDoc(questionsRef, item);
        }
        alert('Questions uploaded successfully!');
        fetchQuestions(); // Refresh the questions list after upload
      } catch (error) {
        console.error('Error uploading questions: ', error);
        alert('Failed to upload questions.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Pagination Logic
  const indexOfLastQuestion = currentPage * rowsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - rowsPerPage;
  const currentQuestions = questionsList.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(questionsList.length / rowsPerPage);

  return (
    <div className="create-quiz-container">
      <h1 className="create-quiz-title">Create a Quiz</h1>
      <form onSubmit={isEditing ? handleUpdateSubmit : handleSubmit} className="create-quiz-form">
        <h2>{isEditing ? 'Update Question' : 'Create a Quiz'}</h2>
        <input
          type="text"
          value={isEditing ? currentQuestion.Question : question}
          onChange={(e) => isEditing ? setCurrentQuestion({ ...currentQuestion, Question: e.target.value }) : setQuestion(e.target.value)}
          placeholder="Enter the quiz question"
          required
        />
        <input
          type="text"
          value={isEditing ? currentQuestion['Option A'] : options[0]}
          onChange={(e) => isEditing ? setCurrentQuestion({ ...currentQuestion, 'Option A': e.target.value }) : handleOptionChange(0, e.target.value)}
          placeholder="Option A"
          required
        />
        <input
          type="text"
          value={isEditing ? currentQuestion['Option B'] : options[1]}
          onChange={(e) => isEditing ? setCurrentQuestion({ ...currentQuestion, 'Option B': e.target.value }) : handleOptionChange(1, e.target.value)}
          placeholder="Option B"
          required
        />
        <input
          type="text"
          value={isEditing ? currentQuestion['Option C'] : options[2]}
          onChange={(e) => isEditing ? setCurrentQuestion({ ...currentQuestion, 'Option C': e.target.value }) : handleOptionChange(2, e.target.value)}
          placeholder="Option C"
          required
        />
        <input
          type="text"
          value={isEditing ? currentQuestion['Option D'] : options[3]}
          onChange={(e) => isEditing ? setCurrentQuestion({ ...currentQuestion, 'Option D': e.target.value }) : handleOptionChange(3, e.target.value)}
          placeholder="Option D"
          required
        />
        <input
          type="text"
          value={isEditing ? currentQuestion['Correct Answer'] : correctAnswer}
          onChange={(e) => isEditing ? setCurrentQuestion({ ...currentQuestion, 'Correct Answer': e.target.value }) : setCorrectAnswer(e.target.value)}
          placeholder="Correct Answer"
          required
        />
        <select
          value={isEditing ? currentQuestion.Category : category}
          onChange={(e) => isEditing ? setCurrentQuestion({ ...currentQuestion, Category: e.target.value }) : setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Networking">Networking</option>
          <option value="History">History</option>
          <option value="Politics">Politics</option>
          <option value="Art">Art</option>
          <option value="Literature">Literature</option>
          <option value="Movies">Movies</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Random">Random</option>
        </select>
        <button type="submit">{isEditing ? 'Update Question' : 'Add Question'}</button>
        {isEditing && <button type="button" onClick={() => { setIsEditing(false); setCurrentQuestion(null); }}>Cancel</button>}
      </form>

      {/* File Upload Section */}
      <div className="upload-section">
        <h2>Upload Questions from Excel</h2>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <button onClick={handleExcelUpload} className="upload-button">Upload Questions</button>
      </div>

      {/* Questions Table */}
      <h2>Questions List</h2>
      {questionsList.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Options</th>
              <th>Correct Answer</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentQuestions.map((question) => {
              const optionsArray = [
                question['Option A'],
                question['Option B'],
                question['Option C'],
                question['Option D'],
              ].filter(option => option);

              return (
                <tr key={question.id}>
                  <td>{question.Question}</td>
                  <td>{optionsArray.length > 0 ? optionsArray.join(', ') : 'No options available'}</td>
                  <td>{question['Correct Answer']}</td>
                  <td>{question.Category}</td>
                  <td>
                    <button onClick={() => handleUpdateQuestion(question)}>Update</button>
                    <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No questions available. Please add some questions.</p>
      )}

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CreateQuizPage;