import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { db } from '../utils/firebase'; // Ensure you import your firebase config
import { collection, onSnapshot } from 'firebase/firestore'; // Use onSnapshot for real-time updates
import { CSVLink } from 'react-csv'; // Import CSVLink for download functionality
import './ReportsPage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ReportsPage = () => {
  // State variables to hold data
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [usersData, setUsersData] = useState([]);
  const [quizzesData, setQuizzesData] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);

  // State variables for graph data
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Users Registered',
        data: [],
        backgroundColor: 'rgba(74, 144, 226, 0.6)',
      },
    ],
  });

  const [quizData, setQuizData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Quizzes Completed',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
      },
    ],
  });

  useEffect(() => {
    // Real-time listener for total users
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      setTotalUsers(snapshot.size); // Update total users count
      const usersArray = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        usersArray.push({ id: doc.id, ...data }); // Collect user data for the table
      });
      setUsersData(usersArray); // Set users data for the table
      setUserData({
        labels: usersArray.map(user => user.registrationDate), // Assuming you have a registrationDate field
        datasets: [
          {
            label: 'Users Registered',
            data: usersArray.map(user => user.count), // Assuming you have a count field
            backgroundColor: 'rgba(74, 144, 226, 0.6)',
          },
        ],
      });
    });

    // Real-time listener for total quizzes
    const unsubscribeQuizzes = onSnapshot(collection(db, 'quizzes'), (snapshot) => {
      setTotalQuizzes(snapshot.size); // Update total quizzes count
      const quizzesArray = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        quizzesArray.push({ id: doc.id, ...data }); // Collect quiz data for the table
      });
      setQuizzesData(quizzesArray); // Set quizzes data for the table
      setQuizData({
        labels: quizzesArray.map(quiz => quiz.category), // Assuming each quiz has a category
        datasets: [
          {
            label: 'Quizzes Completed',
            data: quizzesArray.map(quiz => quiz.completedCount), // Assuming you have a completedCount field
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
            ],
          },
        ],
      });
    });

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeUsers();
      unsubscribeQuizzes();
    };
  }, []);

  // Prepare CSV data for download
  const csvUsersData = usersData.map(({ id, ...rest }) => ({ ...rest })); // Exclude ID for CSV
  const csvQuizzesData = quizzesData.map(({ id, ...rest }) => ({ ...rest })); // Exclude ID for CSV

  return (
    <div className="reports-page">
      <h1 className="navbar-title">Reports Dashboard</h1>
      <div className="reports-container">
        <div className="reports-card">
          <h2>Total Users</h2>
          <p>{totalUsers}</p>
        </div>
        <div className="reports-card">
          <h2>Total Quizzes</h2>
          <p>{totalQuizzes}</p>
        </div>
        <div className="reports-card">
          <h2>Total Questions</h2>
          <p>{totalQuestions}</p>
        </div>

        {/* New Cards with Graphs */}
        <div className="reports-card chart-card">
          <h2>Users Registered Over Time</h2>
          <Bar data={userData} />
        </div>
        <div className="reports-card chart-card">
          <h2>Quizzes Completed by Category</h2>
          <Pie data={quizData} />
        </div>

        {/* Download Buttons */}
        <div className="reports-card">
          <h2>Download Data</h2>
          <CSVLink data={csvUsersData} filename={"users_data.csv"} className="btn" target="_blank">
            Download Users Data
          </CSVLink>
          <CSVLink data={csvQuizzesData} filename={"quizzes_data.csv"} className="btn" target="_blank">
            Download Quizzes Data
          </CSVLink>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;