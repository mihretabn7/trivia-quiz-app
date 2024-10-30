import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const leaderboardRef = collection(db, 'leaderboard');
        const snapshot = await getDocs(leaderboardRef);

        if (snapshot.empty) {
          console.log('No leaderboard data found.');
          setError('No leaderboard data available.');
          return;
        }

        const fetchedLeaderboard = {};
        snapshot.forEach((doc) => {
          const data = doc.data();
          const category = data.category; // Ensure you have a 'category' field in your data

          if (!fetchedLeaderboard[category]) {
            fetchedLeaderboard[category] = [];
          }

          fetchedLeaderboard[category].push({
            id: doc.id,
            username: data.username,
            score: data.score,
          });
        });

        // Sort each category's leaderboard by score in descending order
        for (const category in fetchedLeaderboard) {
          fetchedLeaderboard[category].sort((a, b) => b.score - a.score);
        }

        console.log('Fetched leaderboard data:', fetchedLeaderboard); // Debug log
        setLeaderboardData(fetchedLeaderboard);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to fetch leaderboard. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      {Object.keys(leaderboardData).length === 0 ? (
        <p>No leaderboard data available.</p>
      ) : (
        Object.entries(leaderboardData).map(([category, entries]) => (
          <div key={category} className="category-section">
            <h3 className="category-title">{category} Category</h3>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>{index + 1}</td>
                    <td>{entry.username}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default Leaderboard;
