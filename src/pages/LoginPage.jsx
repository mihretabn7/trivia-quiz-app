// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { Sparkles, User, Lock, Eye, EyeOff } from 'lucide-react';
// // import { db } from '../utils/firebase'; // Import Firestore
// // import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
// // import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// // import './LoginPage.css';

// // const LoginPage = () => {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [profileImage, setProfileImage] = useState(null);
// //   const [isRegistering, setIsRegistering] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [passwordError, setPasswordError] = useState('');
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [loginError, setLoginError] = useState('');
// //   const [consoleMessage, setConsoleMessage] = useState('');
// //   const navigate = useNavigate();

// //   const validatePassword = (pwd) => {
// //     const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
// //     if (!passwordRegex.test(pwd)) {
// //       setPasswordError(
// //         'Password must be at least 8 characters, include an uppercase letter, a number, and a special character.'
// //       );
// //       return false;
// //     }
// //     setPasswordError('');
// //     return true;
// //   };

// //   const handleImageChange = (e) => {
// //     setProfileImage(e.target.files[0]);
// //   };

// //   const handleRegister = async () => {
// //     try {
// //       const usersRef = collection(db, 'users');
// //       const existingUsers = await getDocs(query(usersRef, where('username', '==', username)));

// //       if (!existingUsers.empty) {
// //         setLoginError('Username already taken. Please choose another.');
// //         setConsoleMessage('Registration failed: Username already taken.');
// //         return;
// //       }

// //       let imageUrl = '';
// //       if (profileImage) {
// //         const storage = getStorage();
// //         const storageRef = ref(storage, `profilePictures/${profileImage.name}`);
// //         await uploadBytes(storageRef, profileImage);
// //         imageUrl = await getDownloadURL(storageRef);
// //       }

// //       await addDoc(usersRef, {
// //         username,
// //         password,
// //         profileImage: imageUrl,
// //         role: 'user',
// //       });
// //       setModalVisible(true);
// //       setConsoleMessage('Registration successful! You can now log in.');
// //     } catch (error) {
// //       console.error('Error registering user: ', error);
// //       setLoginError('Registration failed: ' + error.message);
// //       setConsoleMessage('Registration failed: ' + error.message);
// //     }
// //   };

// //   const handleLogin = async () => {
// //     try {
// //         const usersRef = collection(db, 'users');
// //         const lowercaseUsername = username.toLowerCase();
// //         const q = query(usersRef, where('username', '==', lowercaseUsername), where('password', '==', password));
// //         const querySnapshot = await getDocs(q);

// //         if (!querySnapshot.empty) {
// //             // Successful login
// //             const userDoc = querySnapshot.docs[0];
// //             const { role, profileImage } = userDoc.data(); // Assume these fields exist in your user document
// //             localStorage.setItem('username', lowercaseUsername); // Save username to local storage
// //             sessionStorage.setItem('role', role); // Save user role to session storage
// //             sessionStorage.setItem('profileImage', profileImage); // Save profile image to session storage
// //             setConsoleMessage(`Welcome back, ${lowercaseUsername}!`); // Set success message
// //             setTimeout(() => {
// //                 navigate('/userprofile'); // Redirect to user profile page after a brief delay
// //             }, 2000); // Adjust the time as needed (2000ms = 2 seconds)
// //         } else {
// //             // Login failed
// //             setLoginError('Invalid username or password.');
// //             setConsoleMessage('Login failed: Invalid username or password.');
// //         }
// //     } catch (error) {
// //         console.error('Error during login: ', error);
// //         setLoginError('Login failed: ' + error.message);
// //         setConsoleMessage('Login failed: ' + error.message);
// //     }
// // };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (isRegistering) {
// //       if (!validatePassword(password)) return;
// //       if (password !== confirmPassword) {
// //         setLoginError('Passwords do not match. Please try again.');
// //         setConsoleMessage('Passwords do not match.');
// //         return;
// //       }
// //       await handleRegister();
// //     } else {
// //       await handleLogin();
// //     }
// //   };

// //   const toggleShowPassword = () => {
// //     setShowPassword(!showPassword);
// //   };

// //   const closeModal = () => {
// //     setModalVisible(false);
// //     setIsRegistering(false);
// //     setUsername('');
// //     setPassword('');
// //     setConfirmPassword('');
// //     setProfileImage(null);
// //     setLoginError(''); // Clear login error when modal is closed
// //     setConsoleMessage(''); // Clear console message when modal is closed
// //   };

// //   return (
// //     <div className="login-container">
// //       <div className="login-form">
// //         <h1 className="login-title">
// //           <Sparkles size={48} /> {isRegistering ? 'Create Account' : 'Welcome Back!'}
// //         </h1>
// //         <form onSubmit={handleSubmit}>
// //           <div className="input-group">
// //             <label>
// //               <User size={24} className="icon" />
// //               <input
// //                 type="text"
// //                 value={username}
// //                 onChange={(e) => setUsername(e.target.value)}
// //                 placeholder="Username"
// //                 required
// //               />
// //             </label>
// //           </div>
          
// //           <div className="input-group">
// //             <label>
// //               <Lock size={24} className="icon" />
// //               <input
// //                 type={showPassword ? 'text' : 'password'}
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 placeholder="Password"
// //                 required
// //               />
// //               {showPassword ? (
// //                 <EyeOff size={24} className="show-password" onClick={toggleShowPassword} />
// //               ) : (
// //                 <Eye size={24} className="show-password" onClick={toggleShowPassword} />
// //               )}
// //             </label>
// //           </div>
// //           {passwordError && <p className="error-message">{passwordError}</p>}

// //           {isRegistering && (
// //             <>
// //               <div className="input-group">
// //                 <label>
// //                   <Lock size={24} className="icon" />
// //                   <input
// //                     type={showPassword ? 'text' : 'password'}
// //                     value={confirmPassword}
// //                     onChange={(e) => setConfirmPassword(e.target.value)}
// //                     placeholder="Confirm Password"
// //                     required
// //                   />
// //                   {showPassword ? (
// //                     <EyeOff size={24} className="show-password" onClick={toggleShowPassword} />
// //                   ) : (
// //                     <Eye size={24} className="show-password" onClick={toggleShowPassword} />
// //                   )}
// //                 </label>
// //               </div>
// //               <div className="input-group">
// //                 <label>
// //                   <input
// //                     type="file"
// //                     accept="image/*"
// //                     onChange={handleImageChange}
// //                   />
// //                   <span>Profile Picture (optional)</span>
// //                 </label>
// //               </div>
// //             </>
// //           )}
// //           <button type="submit" className="login-button">
// //             {isRegistering ? 'Register' : 'Login'}
// //           </button>
// //         </form>

// //         {loginError && <p className="error-message">{loginError}</p>}
// //         {consoleMessage && <p className="console-message">{consoleMessage}</p>}
// //         <p className="toggle-text" onClick={() => setIsRegistering(!isRegistering)}>
// //           {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
          
// //         </p>
// //         {/* Confirmation Modal */}
// //         {modalVisible && (
// //           <div className="modal">
// //             <div className="modal-content">
// //               <h2>Registration Successful!</h2>
// //               <p>Welcome, {username}! You can now log in.</p>
// //               <button onClick={closeModal} className="modal-button">
// //                 OK
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginPage;
// import React, { useState } from 'react'; // Ensure useState is imported here
// import { useNavigate } from 'react-router-dom';
// import { Sparkles, User, Lock, Eye, EyeOff } from 'lucide-react';
// import { db } from '../utils/firebase'; // Import Firestore
// import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import './LoginPage.css';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [profileImage, setProfileImage] = useState(null);
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordError, setPasswordError] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [loginError, setLoginError] = useState('');
//   const [consoleMessage, setConsoleMessage] = useState('');
//   const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(false);
//   const [resetPasswordMessage, setResetPasswordMessage] = useState('');
//   const navigate = useNavigate();

//   const validatePassword = (pwd) => {
//     const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//     if (!passwordRegex.test(pwd)) {
//       setPasswordError(
//         'Password must be at least 8 characters, include an uppercase letter, a number, and a special character.'
//       );
//       return false;
//     }
//     setPasswordError('');
//     return true;
//   };

//   const handleImageChange = (e) => {
//     setProfileImage(e.target.files[0]);
//   };

//   const handleRegister = async () => {
//     try {
//       const usersRef = collection(db, 'users');
//       const lowerCaseUsername = username.toLowerCase();
//       const existingUsers = await getDocs(query(usersRef, where('username', '==', lowerCaseUsername)));

//       if (!existingUsers.empty) {
//         setLoginError('Username already taken. Please choose another.');
//         setConsoleMessage('Registration failed: Username already taken.');
//         return;
//       }

//       let imageUrl = '';
//       if (profileImage) {
//         const storage = getStorage();
//         const storageRef = ref(storage, `profilePictures/${profileImage.name}`);
//         await uploadBytes(storageRef, profileImage);
//         imageUrl = await getDownloadURL(storageRef);
//       }

//       await addDoc(usersRef, {
//         username:lowerCaseUsername,
//         password,
//         profileImage: imageUrl,
//         role: 'user',
//       });
//       setModalVisible(true);
//       setConsoleMessage('Registration successful! You can now log in.');
//     } catch (error) {
//       console.error('Error registering user: ', error);
//       setLoginError('Registration failed: ' + error.message);
//       setConsoleMessage('Registration failed: ' + error.message);
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const usersRef = collection(db, 'users');
//       const lowercaseUsername = username.toLowerCase();
//       const q = query(usersRef, where('username', '==', lowercaseUsername), where('password', '==', password));
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         // Successful login
//         const userDoc = querySnapshot.docs[0];
//         const { role, profileImage } = userDoc.data(); // Assume these fields exist in your user document
//         localStorage.setItem('username', lowercaseUsername); // Save username to local storage
//         sessionStorage.setItem('role', role); // Save user role to session storage
//         sessionStorage.setItem('profileImage', profileImage); // Save profile image to session storage
//         setConsoleMessage(`Welcome back, ${lowercaseUsername}!`); // Set success message
//         setTimeout(() => {
//           navigate('/userprofile'); // Redirect to user profile page after a brief delay
//         }, 2000); // Adjust the time as needed (2000ms = 2 seconds)
//       } else {
//         // Login failed
//         setLoginError('Invalid username or password.');
//         setConsoleMessage('Login failed: Invalid username or password.');
//       }
//     } catch (error) {
//       console.error('Error during login: ', error);
//       setLoginError('Login failed: ' + error.message);
//       setConsoleMessage('Login failed: ' + error.message);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isRegistering) {
//       if (!validatePassword(password)) return;
//       if (password !== confirmPassword) {
//         setLoginError('Passwords do not match. Please try again.');
//         setConsoleMessage('Passwords do not match.');
//         return;
//       }
//       await handleRegister();
//     } else {
//       await handleLogin();
//     }
//   };

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setIsRegistering(false);
//     setUsername('');
//     setPassword('');
//     setConfirmPassword('');
//     setProfileImage(null);
//     setLoginError(''); // Clear login error when modal is closed
//     setConsoleMessage(''); // Clear console message when modal is closed
//   };

//   const handleResetPassword = () => {
//     // Logic for password reset (you can implement this as needed)
//     navigate('/forgot-password');
//     setResetPasswordModalVisible(false);
//   };

//   return (
//     <div className="login-container">
//       <div className="login-form">
//         <h1 className="login-title">
//           <Sparkles size={48} /> {isRegistering ? 'Create Account' : 'Welcome Back!'}
//         </h1>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label>
//               <User size={24} className="icon" />
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Username"
//                 required
//               />
//             </label>
//           </div>
          
//           <div className="input-group">
//             <label>
//               <Lock size={24} className="icon" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 required
//               />
//               {showPassword ? (
//                 <EyeOff size={24} className="show-password" onClick={toggleShowPassword} />
//               ) : (
//                 <Eye size={24} className="show-password" onClick={toggleShowPassword} />
//               )}
//             </label>
//           </div>
//           {passwordError && <p className="error-message">{passwordError}</p>}

//           {isRegistering && (
//             <>
//               <div className="input-group">
//                 <label>
//                   <Lock size={24} className="icon" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="Confirm Password"
//                     required
//                   />
//                   {showPassword ? (
//                     <EyeOff size={24} className="show-password" onClick={toggleShowPassword} />
//                   ) : (
//                     <Eye size={24} className="show-password" onClick={toggleShowPassword} />
//                   )}
//                 </label>
//               </div>
//               <div className="input-group">
//                 <label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                   <span>Profile Picture (optional)</span>
//                 </label>
//               </div>
//             </>
//           )}
//           <button type="submit" className="login-button">
//             {isRegistering ? 'Register' : 'Login'}
//           </button>
//         </form>

//         {loginError && <p className="error-message">{loginError}</p>}
//         {consoleMessage && <p className="console-message">{consoleMessage}</p>}
        
//         {/* Forgot Password Link */}
//         {!isRegistering && (
//           <p className="forgot-password" onClick={() => setResetPasswordModalVisible(true)}>
//             Forgot Password?
//           </p>
//         )}

//         {/* Reset Password Modal */}
//         {resetPasswordModalVisible && (
//           <div className="modal">
//             <div className="modal-content">
//               <h2>Reset Password</h2>
//               <p>Enter your username to receive a password reset link.</p>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Username"
//                 required
//               />
//               <button onClick={() => navigate('/forgot-password')} className="modal-button">
//                 Send Reset Link
//               </button>
//               <p>{resetPasswordMessage}</p>
//               <button onClick={() => setResetPasswordModalVisible(false)} className="close-modal">
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Modal for successful registration */}
//         {modalVisible && (
//           <div className="modal">
//             <div className="modal-content">
//               <h2>Success!</h2>
//               <p>You have successfully registered!</p>
//               <button onClick={closeModal} className="close-modal">
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
        
//         {/* Toggle between Login and Register */}
//         <p className="toggle-form" onClick={() => setIsRegistering(!isRegistering)}>
//           {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, User, Lock, Eye, EyeOff } from 'lucide-react';
import { db } from '../utils/firebase'; // Import Firestore
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [consoleMessage, setConsoleMessage] = useState('');
  const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(false);
  const [resetPasswordMessage, setResetPasswordMessage] = useState('');
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(pwd)) {
      setPasswordError(
        'Password must be at least 8 characters, include an uppercase letter, a number, and a special character.'
      );
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleRegister = async () => {
    try {
      const usersRef = collection(db, 'users');
      const lowerCaseUsername = username.toLowerCase();
      const existingUsers = await getDocs(query(usersRef, where('username', '==', lowerCaseUsername)));

      if (!existingUsers.empty) {
        setLoginError('Username already taken. Please choose another.');
        setConsoleMessage('Registration failed: Username already taken.');
        return;
      }

      let imageUrl = '';
      if (profileImage) {
        const storage = getStorage();
        const storageRef = ref(storage, `profilePictures/${profileImage.name}`);
        await uploadBytes(storageRef, profileImage);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(usersRef, {
        username: lowerCaseUsername,
        password,
        profileImage: imageUrl,
        role: 'user', // Default role for new users
      });
      setModalVisible(true);
      setConsoleMessage('Registration successful! You can now log in.');
    } catch (error) {
      console.error('Error registering user: ', error);
      setLoginError('Registration failed: ' + error.message);
      setConsoleMessage('Registration failed: ' + error.message);
    }
  };

  const handleLogin = async () => {
    try {
        const usersRef = collection(db, 'users');
        const lowercaseUsername = username.toLowerCase();
        const q = query(usersRef, where('username', '==', lowercaseUsername), where('password', '==', password));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Successful login
            const userDoc = querySnapshot.docs[0];
            const { role, profileImage } = userDoc.data(); // Assume these fields exist in your user document
            
            // Check if the role is 'user' or 'admin' and handle accordingly
            if (role === 'user' || role === 'admin') {
                sessionStorage.setItem('username', lowercaseUsername); // Save username to local storage
                sessionStorage.setItem('role', role); // Save user role to session storage
                sessionStorage.setItem('profileImage', profileImage); // Save profile image to session storage
                sessionStorage.setItem('isLoggedIn', 'true'); // Indicate that the user is logged in
                setConsoleMessage(`Welcome back, ${lowercaseUsername}!`); // Set success message
                setTimeout(() => {
                    navigate('/userprofile'); // Redirect to user profile page after a brief delay
                }, 2000); // Adjust the time as needed (2000ms = 2 seconds)
            } else {
                setLoginError('Unauthorized role.'); // Handle unauthorized roles
                setConsoleMessage('Login failed: Unauthorized role.');
            }
        } else {
            // Login failed
            setLoginError('Invalid username or password.');
            setConsoleMessage('Login failed: Invalid username or password.');
        }
    } catch (error) {
        console.error('Error during login: ', error);
        setLoginError('Login failed: ' + error.message);
        setConsoleMessage('Login failed: ' + error.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      if (!validatePassword(password)) return;
      if (password !== confirmPassword) {
        setLoginError('Passwords do not match. Please try again.');
        setConsoleMessage('Passwords do not match.');
        return;
      }
      await handleRegister();
    } else {
      await handleLogin();
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    setModalVisible(false);
    setIsRegistering(false);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setProfileImage(null);
    setLoginError(''); // Clear login error when modal is closed
    setConsoleMessage(''); // Clear console message when modal is closed
  };

  const handleResetPassword = () => {
    // Logic for password reset (you can implement this as needed)
    navigate('/forgot-password');
    setResetPasswordModalVisible(false);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">
          <Sparkles size={48} /> {isRegistering ? 'Create Account' : 'Welcome Back!'}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              <User size={24} className="icon" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </label>
          </div>
          
          <div className="input-group">
            <label>
              <Lock size={24} className="icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              {showPassword ? (
                <EyeOff size={24} className="show-password" onClick={toggleShowPassword} />
              ) : (
                <Eye size={24} className="show-password" onClick={toggleShowPassword} />
              )}
            </label>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}

          {isRegistering && (
            <>
              <div className="input-group">
                <label>
                  <Lock size={24} className="icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                  />
                  {showPassword ? (
                    <EyeOff size={24} className="show-password" onClick={toggleShowPassword} />
                  ) : (
                    <Eye size={24} className="show-password" onClick={toggleShowPassword} />
                  )}
                </label>
              </div>
              <div className="input-group">
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <span>Profile Picture (optional)</span>
                </label>
              </div>
            </>
          )}
          <button type="submit" className="login-button">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        {loginError && <p className="error-message">{loginError}</p>}
        {consoleMessage && <p className="console-message">{consoleMessage}</p>}
        
        {/* Forgot Password Link */}
        {!isRegistering && (
          <p className="forgot-password" onClick={() => setResetPasswordModalVisible(true)}>
            Forgot Password?
          </p>
        )}

        {/* Reset Password Modal */}
        {resetPasswordModalVisible && (
          <div className="modal">
            <div className="modal-content">
              <h2>Reset Password</h2>
              <p>Enter your username to receive a password reset link.</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
              <button onClick={() => navigate('/forgot-password')} className="modal-button">
                Send Reset Link
              </button>
              <p>{resetPasswordMessage}</p>
              <button onClick={() => setResetPasswordModalVisible(false)} className="close-modal">
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal for successful registration */}
        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <h2>Success!</h2>
              <p>You have successfully registered!</p>
              <button onClick={closeModal} className="close-modal">
                Close
              </button>
            </div>
          </div>
        )}
        
        {/* Toggle between Login and Register */}
        <p className="toggle-form" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;