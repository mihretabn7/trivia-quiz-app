
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Bar, Line, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   PointElement,
//   ArcElement,
// } from 'chart.js';
// import { db } from '../utils/firebase'; // Ensure you import your firebase config
// import { collection, getDocs } from 'firebase/firestore';
// import './AdminPage.css';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement);

// const AdminPage = () => {
//   const navigate = useNavigate();

//   // State variables to hold data
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalQuizzes, setTotalQuizzes] = useState(0);
//   const [totalQuestions, setTotalQuestions] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch total users
//         const usersRef = collection(db, 'users');
//         const usersSnapshot = await getDocs(usersRef);
//         setTotalUsers(usersSnapshot.size); // Set the total users

//         // Fetch total quizzes
//         const quizzesRef = collection(db, 'questions');
//         const quizzesSnapshot = await getDocs(quizzesRef);
//         setTotalQuizzes(quizzesSnapshot.size); // Set the total quizzes

//         // Fetch total questions
//         const questionsRef = collection(db, 'questions');
//         const questionsSnapshot = await getDocs(questionsRef);
//         setTotalQuestions(questionsSnapshot.size); // Set the total questions
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleLogout = () => {
//     console.log('Logged out');
//   };

//   const userData = {
//     labels: ['January', 'February', 'March', 'April', 'May'],
//     datasets: [
//       {
//         label: 'Users Registered',
//         data: [30, 50, 70, 90, 110], // Sample data, replace with actual data if available
//         backgroundColor: 'rgba(74, 144, 226, 0.6)',
//       },
//     ],
//   };

//   const quizData = {
//     labels: ['Easy', 'Medium', 'Hard'],
//     datasets: [
//       {
//         label: 'Quizzes Completed',
//         data: [150, 200, 100], // Sample data, replace with actual data if available
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.6)',
//           'rgba(54, 162, 235, 0.6)',
//           'rgba(255, 206, 86, 0.6)',
//         ],
//       },
//     ],
//   };

//   const recentActivitiesData = {
//     labels: ['Last Week', 'Last Month', 'Last 3 Months'],
//     datasets: [
//       {
//         label: 'Activities',
//         data: [20, 50, 150], // Sample data, replace with actual data if available
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       },
//     ],
//   };

//   const navigateToUserManagement = () => {
//     navigate('/admin/users');
//   };

//   const navigateToQuizManagement = () => {
//     navigate('/admin/quizzes');
//   };

//   const navigateToReports = () => {
//     navigate('/admin/reports');
//   };

//   const navigateToSettings = () => {
//     navigate('/admin/settings');
//   };

//   return (
//     <div className="admin-page">
//       <div>
//         <h1 className="navbar-title">Admin Dashboard</h1>
        
//       </div>
//       <div className="admin-container">
//         <div className="admin-card" onClick={navigateToUserManagement}>
//           <h2>Total Users</h2>
//           <p>{totalUsers}</p> {/* Display total users from Firestore */}
//         </div>
//         <div className="admin-card" onClick={navigateToQuizManagement}>
//           <h2>Total Quizzes</h2>
//           <p>{totalQuizzes}</p> {/* Display total quizzes from Firestore */}
//         </div>
//         <div className="admin-card">
//           <h2>Total Questions</h2>
//           <p>{totalQuestions}</p> {/* Display total questions from Firestore */}
//         </div>
//         <div className="admin-card">
//           <h2>Recent Activities</h2>
//           <p>Last quiz created: Quiz Title</p>
//         </div>

//         {/* New Cards with Graphs */}
//         <div className="admin-card chart-card">
//           <h2>Users Registered Over Time</h2>
//           <Bar data={userData} />
//         </div>
//         <div className="admin-card chart-card">
//           <h2>Quizzes Completed by Difficulty</h2>
//           <Pie data={quizData} />
//         </div>
//         <div className="admin-card chart-card">
//           <h2>Recent Activities</h2>
//           <Line data={recentActivitiesData} />
//         </div>

//         {/* New Sections for Navigation */}
//         <div className="admin-card" onClick={navigateToReports}>
//           <h2>View Reports</h2>
//           <p>Analytics and performance reports</p>
//         </div>
//         <div className="admin-card" onClick={navigateToSettings}>
//           <h2>Settings</h2>
//           <p>Configure application settings</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from 'chart.js';
import { db } from '../utils/firebase'; // Ensure you import your firebase config
import { collection, onSnapshot } from 'firebase/firestore'; // Use onSnapshot for real-time updates
import './AdminPage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement);

const AdminPage = () => {
  const navigate = useNavigate();

  // State variables to hold data
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

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

  const [recentActivitiesData, setRecentActivitiesData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Activities',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });

  useEffect(() => {
    // Real-time listener for total users
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      setTotalUsers(snapshot.size); // Update total users count

      // Update user data for the graph
      const userLabels = [];
      const userCounts = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        userLabels.push(data.registrationDate); // Assuming you have a registrationDate field
        userCounts.push(data.count); // Assuming you have a count field
      });
      setUserData({
        labels: userLabels,
        datasets: [
          {
            label: 'Users Registered',
            data: userCounts,
            backgroundColor: 'rgba(74, 144, 226, 0.6)',
          },
        ],
      });
    });

    // Real-time listener for total quizzes
    const unsubscribeQuizzes = onSnapshot(collection(db, 'quizzes'), (snapshot) => {
      setTotalQuizzes(snapshot.size); // Update total quizzes count

      // Update quiz data for the graph
      const quizLabels = [];
      const quizCounts = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        quizLabels.push(data.category); // Assuming each quiz has a category
        quizCounts.push(data.completedCount); // Assuming you have a completedCount field
      });
      setQuizData({
        labels: quizLabels,
        datasets: [
          {
            label: 'Quizzes Completed',
            data: quizCounts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
            ],
          },
        ],
      });
    });

    // Real-time listener for total questions
    const unsubscribeQuestions = onSnapshot(collection(db, 'questions'), (snapshot) => {
      setTotalQuestions(snapshot.size); // Update total questions count

      // Update recent activities data for the graph
      const activityLabels = [];
      const activityCounts = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        activityLabels.push(data.activityDate); // Assuming you have an activityDate field
        activityCounts.push(data.count); // Assuming you have a count field
      });
      setRecentActivitiesData({
        labels: activityLabels,
        datasets: [
          {
            label: 'Activities',
            data: activityCounts,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      });
    });

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeUsers();
      unsubscribeQuizzes();
      unsubscribeQuestions();
    };
  }, []);

  const handleLogout = () => {
    console.log('Logged out');
  };

  const navigateToUserManagement = () => {
    navigate('/admin/users');
  };

  const navigateToQuizManagement = () => {
    navigate('/admin/quizzes');
  };

  const navigateToReports = () => {
    navigate('/admin/reports');
  };

  const navigateToSettings = () => {
    navigate('/admin/settings');
  };

  return (
    <div className="admin-page">
      <div>
        <h1 className="navbar-title">Admin Dashboard</h1>
      </div>
      <div className="admin-container">
        <div className="admin-card" onClick={navigateToUserManagement}>
          <h2>Total Users</h2>
          <p>{totalUsers}</p> {/* Display total users from Firestore */}
        </div>
        <div className="admin-card" onClick={navigateToQuizManagement}>
          <h2>Total Quizzes</h2>
          <p>{totalQuizzes}</p> {/* Display total quizzes from Firestore */}
        </div>
        <div className="admin-card">
          <h2>Total Questions</h2>
          <p>{totalQuestions}</p> {/* Display total questions from Firestore */}
        </div>
        <div className="admin-card">
          <h2>Recent Activities</h2>
          <p>Last quiz created: Quiz Title</p>
        </div>

        {/* New Cards with Graphs */}
        <div className="admin-card chart-card">
          <h2>Users Registered Over Time</h2>
          <Bar data={userData} />
        </div>
        <div className="admin-card chart-card">
          <h2>Quizzes Completed by Difficulty</h2>
          <Pie data={quizData} />
        </div>
        <div className="admin-card chart-card">
          <h2>Recent Activities</h2>
          <Line data={recentActivitiesData} />
        </div>

        {/* New Sections for Navigation */}
        <div className="admin-card" onClick={navigateToReports}>
          <h2>View Reports</h2>
          <p>Analytics and performance reports</p>
        </div>
        <div className="admin-card" onClick={navigateToSettings}>
          <h2>Settings</h2>
          <p>Configure application settings</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;