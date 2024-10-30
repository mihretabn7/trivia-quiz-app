
// import React, { useEffect, useState } from 'react';
// import { db, storage } from '../utils/firebase'; // Ensure you import storage
// import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore'; // Ensure all necessary functions are imported
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary functions for storage
// import './UserProfile.css';

// const UserProfile = () => {
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null); // State for error handling
//     const [newUsername, setNewUsername] = useState('');
//     const [imageFile, setImageFile] = useState(null); // State for the selected image file
//     const [quizzesParticipated, setQuizzesParticipated] = useState(0);
//     const [quizzesCompleted, setQuizzesCompleted] = useState(0);
//     const [averageScore, setAverageScore] = useState(0);
//     const [totalScore, setTotalScore] = useState(0); // State for total score
//     const [rank, setRank] = useState(0); // State for rank
//     const username = sessionStorage.getItem('username'); // Retrieve username from local storage
//     const navigate = useNavigate(); // Initialize useNavigate

//     useEffect(() => {
//         const fetchUserData = async () => {
//             if (username) {
//                 try {
//                     // Fetch user data from the users collection
//                     const usersRef = collection(db, 'users');
//                     const q = query(usersRef, where('username', '==', username));
//                     const querySnapshot = await getDocs(q);
                    
//                     if (!querySnapshot.empty) {
//                         const userDoc = querySnapshot.docs[0];
//                         const user = { id: userDoc.id, ...userDoc.data() };
//                         setUserData(user);
                        
//                         // Fetch leaderboard data for the specific user
//                         const leaderboardRef = collection(db, 'leaderboard');
//                         const leaderboardQuery = query(leaderboardRef, where('username', '==', username));
//                         const leaderboardSnapshot = await getDocs(leaderboardQuery);
                        
//                         let totalScore = 0;
//                         let quizzesParticipated = 0;
//                         let quizzesCompleted = 0;

//                         leaderboardSnapshot.forEach(doc => {
//                             const data = doc.data();
//                             totalScore += data.score; // Sum the scores
//                             quizzesParticipated += 1; // Increment participated count
//                             if (data.completed) { // Adjust this condition based on your data structure
//                                 quizzesCompleted += 1; // Increment completed count
//                             }
//                         });

//                         setQuizzesParticipated(quizzesParticipated); // Set quizzes participated
//                         setQuizzesCompleted(quizzesCompleted); // Set quizzes completed
//                         setTotalScore(totalScore); // Set total score
//                         setAverageScore(totalScore / quizzesParticipated || 0); // Calculate average score

//                         // Calculate rank
//                         const allScoresSnapshot = await getDocs(leaderboardRef);
//                         const allScores = allScoresSnapshot.docs.map(doc => ({
//                             username: doc.data().username,
//                             score: doc.data().score,
//                         }));

//                         // Sort scores in descending order
//                         allScores.sort((a, b) => b.score - a.score);

//                         // Find the user's rank
//                         const userRank = allScores.findIndex(score => score.username === username) + 1; // Rank starts from 1
//                         setRank(userRank);
//                     } else {
//                         setError('User not found. Please log in again.'); // Set error if user not found
//                     }
//                 } catch (error) {
//                     console.error('Error fetching user data: ', error);
//                     setError('Error fetching user data: ' + error.message); // Set error message
//                 } finally {
//                     setLoading(false);
//                 }
//             } else {
//                 console.log('No user logged in');
//                 setLoading(false);
//             }
//         };

//         fetchUserData();
//     }, [username]);

//     const handleLogout = () => {
//         localStorage.removeItem('username'); // Remove username from local storage
//         sessionStorage.removeItem('username'); // Remove username from session storage
//         navigate('/login'); // Redirect to login page
//     };

//     const navigateToHomePage = () => {
//         sessionStorage.setItem('username', username); // Keep username in session storage
//         navigate('/'); // Redirect to home page
//     };

//     const handleUpdateProfile = async () => {
//         try {
//             const usersRef = collection(db, 'users');
//             const userDocRef = doc(usersRef, userData.id); // Get reference to user document
            
//             // Upload image if a new file is selected
//             let imageUrl = userData.profileImage; // Default to current image
//             if (imageFile) {
//                 const imageRef = ref(storage, `profileImages/${userData.username}`);
//                 await uploadBytes(imageRef, imageFile); // Upload the file
//                 imageUrl = await getDownloadURL(imageRef); // Get the download URL
//             }

//             await updateDoc(userDocRef, {
//                 username: newUsername || userData.username,
//                 profileImage: imageUrl, // Use the new image URL
//             });

//             // Update local state with new data
//             setUserData((prev) => ({
//                 ...prev,
//                 username: newUsername || prev.username,
//                 profileImage: imageUrl,
//             }));
//             alert('Profile updated successfully!');
//         } catch (error) {
//             console.error('Error updating profile: ', error);
//         }
//     };

//     if (loading) {
//         return <div className="loading">Loading...</div>;
//     }

//     return (
//         <div className="user-profile">
//             {error && <p className="error-message">{error}</p>} {/* Display error message */}
//             {userData ? (
//                 <>
//                     <h1 className="profile-title">User Profile</h1>
//                     <div className="profile-card">
//                         <div className="profile-info">
//                             <img
//                                 src={userData.profileImage || '/default-profile.png'}
//                                 alt="Profile"
//                                 className="profile-image"
//                             />
//                             <h2 className="username">{userData.username}</h2>
//                         </div>
//                         <div className="additional-info">
//                             <p className="role">Role: <span>{userData.role}</span></p>
//                             <p className="rank">Rank: <span>{rank || 'N/A'}</span></p> {/* Display rank */}
//                             <p className="quizzes-participated">Quizzes Participated: <span>{quizzesParticipated || 0}</span></p>
//                             <p className="quizzes-completed">Quizzes Completed: <span>{quizzesCompleted || 0}</span></p>
//                             <p className="average-score">Average Score: <span>{averageScore.toFixed(2) || 'N/A'}</span></p>
//                             <p className="total-score">Total Score: <span>{totalScore || 0}</span></p> {/* Display total score */}
//                         </div>
//                         <div className="update-profile">
//                             <h3>Update Profile</h3>
//                             <input
//                                 type="text"
//                                 placeholder="New Username"
//                                 value={newUsername}
//                                 onChange={(e) => setNewUsername(e.target.value)}
//                             />
//                             <input
//                                 type="file" // Change to file input for image upload
//                                 accept="image/*" // Accept only image files
//                                 onChange={(e) => setImageFile(e.target.files[0])} // Set the selected file
//                             />
//                             <button onClick={handleUpdateProfile}>Update Profile</button>
//                         </div>
//                         <div className="action-buttons">
//                             <button className="home-button" onClick={navigateToHomePage}>
//                                 Go to Quizzes
//                             </button>
//                             <button className="logout-button" onClick={handleLogout}>
//                                 Logout
//                             </button>
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 <p className="no-user-message">No user data found. Please log in again.</p>
//             )}
//         </div>
//     );
// };

// export default UserProfile;
import React, { useEffect, useState } from 'react';
import { db, storage } from '../utils/firebase'; // Ensure you import storage
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary functions for storage
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [imageFile, setImageFile] = useState(null); // State for the selected image file
    const username = sessionStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (username) {
                try {
                    const usersRef = collection(db, 'users');
                    const q = query(usersRef, where('username', '==', username));
                    const querySnapshot = await getDocs(q);
                    
                    if (!querySnapshot.empty) {
                        const userDoc = querySnapshot.docs[0];
                        const user = { id: userDoc.id, ...userDoc.data() };
                        setUserData(user);
                    } else {
                        setError('User not found. Please log in again.');
                    }
                } catch (error) {
                    console.error('Error fetching user data: ', error);
                    setError('Error fetching user data: ' + error.message);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log('No user logged in');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [username]);

    const handleUpdateProfile = async () => {
        try {
            const usersRef = collection(db, 'users');
            const userDocRef = doc(usersRef, userData.id);
            
            // Upload image if a new file is selected
            let imageUrl = userData.profileImage; // Default to current image
            if (imageFile) {
                const imageRef = ref(storage, `profileImages/${userData.username}`);
                await uploadBytes(imageRef, imageFile); // Upload the file
                imageUrl = await getDownloadURL(imageRef); // Get the download URL
            }

            await updateDoc(userDocRef, {
                username: newUsername || userData.username,
                profileImage: imageUrl,
            });

            // Update local state with new data
            setUserData((prev) => ({
                ...prev,
                username: newUsername || prev.username,
                profileImage: imageUrl,
            }));
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile: ', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="user-profile">
            {error && <p className="error-message">{error}</p>}
            {userData ? (
                <>
                    <h1 className="profile-title">User Profile</h1>
                    <div className="profile-card">
                        <div className="profile-info">
                            <img
                                src={userData.profileImage || '/default-profile.png'}
                                alt="Profile"
                                className="profile-image"
                            />
                            <h2 className="username">{userData.username}</h2>
                        </div>
                        <div className="update-profile">
                            <h3>Update Profile</h3>
                            <input
                                type="text"
                                placeholder="New Username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                            />
                            
                            <button onClick={handleUpdateProfile}>Update Profile</button>
                        </div>
                    </div>
                </>
            ) : (
                <p className="no-user-message">No user data found. Please log in again.</p>
            )}
        </div>
    );
};

export default UserProfile;