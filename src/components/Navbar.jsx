// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../Navbar.css'; // Optional: CSS for Navbar styling



// const Navbar = () => {
//     const username = sessionStorage.getItem('username'); // Retrieve username from session storage
//     const userRole = sessionStorage.getItem('role'); // Retrieve user role from session storage
//     const profileImage = sessionStorage.getItem('profileImage'); // Retrieve profile image from session storage
//     const navigate = useNavigate();
    

//     const handleLogout = () => {
//         localStorage.removeItem('username'); // Remove username from local storage
//         sessionStorage.removeItem('username'); // Remove username from session storage
//         sessionStorage.removeItem('role'); // Remove role from session storage
//         sessionStorage.removeItem('profileImage'); // Remove profile image from session storage
//         navigate('/login'); // Redirect to login page
//     };

//     console.log("User Details:", {
//         username,
//         role: userRole,
//         profileImage,
//     });

//     return (
//         <nav className="navbar fade-in ">
//             <div className="navbar-brand">Trivia Quiz App</div>
//             <ul className="navbar-links">
//                 <li>
//                     <Link to="/">Home</Link>
//                 </li>
//                 <li>
//                     <Link to="/leaderboard">Leader Boards</Link>
//                 </li>
//                 <li>
//                     <Link to="/login">Login</Link>
//                 </li>
//                 {/* Conditionally render the admin link */}
//                 {userRole === 'admin' && (
//                     <li>
//                         <Link to="/admin">Admin</Link>
//                     </li>
//                 )}
//                 <li>
//                     <Link to="/userprofile" className="text-white">Profile</Link>
//                 </li>
//                 <li>
//                     {username && <span className="user-greeting">Hello, {username}!</span>}
//                 </li>
//                 <li>
//                     <button onClick={handleLogout}>Logout</button>
//                 </li>
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Navbar.css'; // Optional: CSS for Navbar styling

const Navbar = () => {
    const username = sessionStorage.getItem('username'); // Retrieve username from session storage
    const userRole = sessionStorage.getItem('role'); // Retrieve user role from session storage
    const profileImage = sessionStorage.getItem('profileImage'); // Retrieve profile image from session storage
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('username'); // Remove username from local storage
        sessionStorage.removeItem('username'); // Remove username from session storage
        sessionStorage.removeItem('role'); // Remove role from session storage
        sessionStorage.removeItem('profileImage'); // Remove profile image from session storage
        navigate('/login'); // Redirect to login page
    };

    console.log("User Details:", {
        username,
        role: userRole,
        profileImage,
    });

    return (
        <nav className="navbar fade-in ">
            <div className="navbar-brand">Trivia Quiz App</div>
            <ul className="navbar-links">
                <li>
                    {username ? (
                        <Link to="/">Home</Link>
                    ) : (
                        <span className="home-nav-bar">Home (Login to access)</span> // Optional: Message for guests
                    )}
                </li>
                <li>
                    <Link to="/leaderboard">Leader Boards</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                {/* Conditionally render the admin link */}
                {userRole === 'admin' && (
                    <li>
                        <Link to="/admin">Admin</Link>
                    </li>
                )}
                <li>
                    <Link to="/userprofile" className="text-white">Profile</Link>
                </li>
                <li>
                    {username ? (
                        <span className="user-greeting">Hello, {username}!</span>
                    ) : (
                        <span className="user-greeting">Hello, Guest!</span> // Optional: Display a default message
                    )}
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;