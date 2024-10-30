
// // import React, { useEffect, useState } from 'react';
// // import { db } from '../utils/firebase'; // Adjust according to your file structure
// // import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
// // import './UserManagementPage.css'; // Include the CSS file

// // const UsersPage = () => {
// //   const [users, setUsers] = useState([]);
// //   const [newUser, setNewUser] = useState({ username: '', password: '', profileImage: '', role: 'user' });
// //   const [newPasswords, setNewPasswords] = useState({});
// //   const [editUser, setEditUser] = useState(null);

// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       const usersCollection = collection(db, 'users');
// //       const userDocs = await getDocs(usersCollection);
      
// //       const usersData = userDocs.docs.map(doc => ({
// //         id: doc.id,
// //         ...doc.data(),
// //       }));

// //       setUsers(usersData);
// //     };

// //     fetchUsers();
// //   }, []);

// //   const handlePasswordUpdate = async (userId) => {
// //     const userDocRef = doc(db, 'users', userId);
// //     await updateDoc(userDocRef, { password: newPasswords[userId] });
// //     alert('Password updated successfully!');
// //     setNewPasswords({ ...newPasswords, [userId]: '' });
// //   };

// //   const handleInputChange = (userId, value) => {
// //     setNewPasswords({ ...newPasswords, [userId]: value });
// //   };

// //   const handleNewUserChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewUser({ ...newUser, [name]: value });
// //   };

// //   const handleAddUser = async () => {
// //     const usersCollection = collection(db, 'users');
// //     await addDoc(usersCollection, newUser);
// //     alert('User added successfully!');
// //     setNewUser({ username: '', password: '', profileImage: '', role: 'user' });
// //   };

// //   const handleEditUserChange = (e) => {
// //     const { name, value } = e.target;
// //     setEditUser({ ...editUser, [name]: value });
// //   };

// //   const handleEditUser = (user) => {
// //     setEditUser(user);
// //   };

// //   const handleUpdateUser = async () => {
// //     const userDocRef = doc(db, 'users', editUser.id);
// //     await updateDoc(userDocRef, {
// //       username: editUser.username,
// //       profileImage: editUser.profileImage || '', // Provide a default if undefined
// //       role: editUser.role,
// //       password: newPasswords[editUser.id] || editUser.password,
// //     });
// //     alert('User updated successfully!');
// //     setEditUser(null);
// //   };

// //   const handleDeleteUser = async (userId) => {
// //     const userDocRef = doc(db, 'users', userId);
// //     await deleteDoc(userDocRef);
// //     setUsers(users.filter(user => user.id !== userId)); // Update local state
// //     alert('User deleted successfully!');
// //   };

// //   return (
// //     <div className="users-page">
// //       <h1 className="navbar-title">User Management</h1>
      
// //       <div className="new-user-form">
// //         <h2>Add New User</h2>
// //         <input
// //           type="text"
// //           name="username"
// //           placeholder="Username"
// //           value={newUser.username}
// //           onChange={handleNewUserChange}
// //         />
// //         <input
// //           type="password"
// //           name="password"
// //           placeholder="Password"
// //           value={newUser.password}
// //           onChange={handleNewUserChange}
// //         />
// //         <input
// //           type="text"
// //           name="profileImage"
// //           placeholder="Profile Image URL"
// //           value={newUser.profileImage}
// //           onChange={handleNewUserChange}
// //         />
// //         <select
// //           name="role"
// //           value={newUser.role}
// //           onChange={handleNewUserChange}
// //         >
// //           <option value="user">User</option>
// //           <option value="admin">Admin</option>
// //         </select>
// //         <button onClick={handleAddUser}>Add User</button>
// //       </div>

// //       <table className="users-table">
// //         <thead>
// //           <tr>
// //             <th>Username</th>
// //             <th>Profile Image</th>
// //             <th>Role</th>
// //             <th>Password</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.map(user => (
// //             <tr key={user.id}>
// //               <td>{user.username}</td>
// //               <td>
// //                 <img src={user.profileImage || 'default-image-url.jpg'} alt="Profile" width={50} />
// //               </td>
// //               <td>{user.role}</td>
// //               <td>*****</td>
// //               <td>
// //                 <div className="user-actions">
// //                   <button onClick={() => handleEditUser(user)}>Edit</button>
// //                   <input
// //                     type="password"
// //                     placeholder="New Password"
// //                     value={newPasswords[user.id] || ''}
// //                     onChange={(e) => handleInputChange(user.id, e.target.value)}
// //                   />
// //                   <button onClick={() => handlePasswordUpdate(user.id)}>
// //                     Update Password
// //                   </button>
// //                   <button onClick={() => handleDeleteUser(user.id)}>
// //                     Delete
// //                   </button>
// //                 </div>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {editUser && (
// //         <div className="edit-user-form">
// //           <h2>Edit User</h2>
// //           <input
// //             type="text"
// //             name="username"
// //             placeholder="Username"
// //             value={editUser.username}
// //             onChange={handleEditUserChange}
// //           />
// //           <input
// //             type="text"
// //             name="profileImage"
// //             placeholder="Profile Image URL"
// //             value={editUser.profileImage}
// //             onChange={handleEditUserChange}
// //           />
// //           <select
// //             name="role"
// //             value={editUser.role}
// //             onChange={handleEditUserChange}
// //           >
// //             <option value="user">User</option>
// //             <option value="admin">Admin</option>
// //           </select>
// //           <input
// //             type="password"
// //             placeholder="New Password (leave blank to keep current)"
// //             onChange={(e) => handleInputChange(editUser.id, e.target.value)}
// //           />
// //           <button onClick={handleUpdateUser}>Update User</button>
// //           <button onClick={() => setEditUser(null)}>Cancel</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UsersPage;
// import React, { useEffect, useState } from 'react';
// import { db } from '../utils/firebase'; // Adjust according to your file structure
// import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
// import './UserManagementPage.css'; // Include the CSS file

// const UsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState({ username: '', password: '', profileImage: '', role: 'user' });
//   const [newPasswords, setNewPasswords] = useState({});
//   const [editUser, setEditUser] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const usersCollection = collection(db, 'users');
//       const userDocs = await getDocs(usersCollection);
      
//       const usersData = userDocs.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setUsers(usersData);
//     };

//     fetchUsers();
//   }, []);

//   const handlePasswordUpdate = async (userId) => {
//     const userDocRef = doc(db, 'users', userId);
//     await updateDoc(userDocRef, { password: newPasswords[userId] });
//     alert('Password updated successfully!');
//     setNewPasswords({ ...newPasswords, [userId]: '' });
//   };

//   const handleInputChange = (userId, value) => {
//     setNewPasswords({ ...newPasswords, [userId]: value });
//   };

//   const handleNewUserChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser({ ...newUser, [name]: value });
//   };

//   const handleAddUser = async () => {
//     const usersCollection = collection(db, 'users');
//     await addDoc(usersCollection, newUser);
//     alert('User added successfully!');
//     setNewUser({ username: '', password: '', profileImage: '', role: 'user' });
//   };

//   const handleEditUserChange = (e) => {
//     const { name, value } = e.target;
//     setEditUser({ ...editUser, [name]: value });
//   };

//   const handleEditUser = (user) => {
//     setEditUser(user);
//   };

//   const handleUpdateUser = async () => {
//     const userDocRef = doc(db, 'users', editUser.id);
//     await updateDoc(userDocRef, {
//       username: editUser.username,
//       profileImage: editUser.profileImage || '', // Provide a default if undefined
//       role: editUser.role,
//       password: newPasswords[editUser.id] || editUser.password,
//     });
//     alert('User updated successfully!');
//     setEditUser(null);
//   };

//   const handleDeleteUser = async (userId) => {
//     const userDocRef = doc(db, 'users', userId);
//     await deleteDoc(userDocRef);
//     setUsers(users.filter(user => user.id !== userId)); // Update local state
//     alert('User deleted successfully!');
//   };

//   return (
//     <div className="users-page">
//       <h1 className="navbar-title">User Management</h1>
      
//       <div className="new-user-form">
//         <h2>Add New User</h2>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={newUser.username}
//           onChange={handleNewUserChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={newUser.password}
//           onChange={handleNewUserChange}
//         />
//         <input
//           type="text"
//           name="profileImage"
//           placeholder="Profile Image URL"
//           value={newUser.profileImage}
//           onChange={handleNewUserChange}
//         />
//         <select
//           name="role"
//           value={newUser.role}
//           onChange={handleNewUserChange}
//         >
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button onClick={handleAddUser}>Add User</button>
//       </div>

//       <table className="users-table">
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Profile Image</th>
//             <th>Role</th>
//             <th>Password</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>{user.username}</td>
//               <td>
//                 <img src={user.profileImage || 'default-image-url.jpg'} alt="Profile" width={50} />
//               </td>
//               <td>{user.role}</td>
//               <td>*****</td>
//               <td>
//                 <div className="user-actions">
//                   <button onClick={() => handleEditUser(user)}>Edit</button>
//                   <input
//                     type="password"
//                     placeholder="New Password"
//                     value={newPasswords[user.id] || ''}
//                     onChange={(e) => handleInputChange(user.id, e.target.value)}
//                   />
//                   <button onClick={() => handlePasswordUpdate(user.id)}>
//                     Update Password
//                   </button>
//                   <button onClick={() => handleDeleteUser(user.id)}>
//                     Delete
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {editUser && (
//         <div className="edit-user-form">
//           <h2>Edit User</h2>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={editUser.username}
//             onChange={handleEditUserChange}
//           />
//           <input
//             type="text"
//             name="profileImage"
//             placeholder="Profile Image URL"
//             value={editUser.profileImage}
//             onChange={handleEditUserChange}
//           />
//           <select
//             name="role"
//             value={editUser.role}
//             onChange={handleEditUserChange}
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//           <input
//             type="password"
//             placeholder="New Password (leave blank to keep current)"
//             onChange={(e) => handleInputChange(editUser.id, e.target.value)}
//           />
//           <button onClick={handleUpdateUser}>Update User</button>
//           <button onClick={() => setEditUser(null)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UsersPage;
import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase'; // Adjust according to your file structure
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import './UserManagementPage.css'; // Include the CSS file

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({ username: '', password: '', profileImage: '', role: 'user' });
  const [newPasswords, setNewPasswords] = useState({});
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userDocs = await getDocs(usersCollection);
      
      const usersData = userDocs.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handlePasswordUpdate = async (userId) => {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { password: newPasswords[userId] });
    alert('Password updated successfully!');
    setNewPasswords({ ...newPasswords, [userId]: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleAddOrUpdateUser = async () => {
    if (editUser) {
      // Update existing user
      const userDocRef = doc(db, 'users', editUser.id);
      await updateDoc(userDocRef, {
        username: userForm.username,
        profileImage: userForm.profileImage || '', // Provide a default if undefined
        role: userForm.role,
        password: newPasswords[editUser.id] || userForm.password,
      });
      alert('User updated successfully!');
      setEditUser(null);
    } else {
      // Add new user
      const usersCollection = collection(db, 'users');
      await addDoc(usersCollection, userForm);
      alert('User added successfully!');
    }
    // Reset form and fetch updated user list
    setUserForm({ username: '', password: '', profileImage: '', role: 'user' });
    const usersCollection = collection(db, 'users');
    const userDocs = await getDocs(usersCollection);
    const usersData = userDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersData);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setUserForm({ username: user.username, password: user.password, profileImage: user.profileImage, role: user.role });
  };

  const handleDeleteUser = async (userId) => {
    const userDocRef = doc(db, 'users', userId);
    await deleteDoc(userDocRef);
    setUsers(users.filter(user => user.id !== userId)); // Update local state
    alert('User deleted successfully!');
  };

  const handleCancel = () => {
    setEditUser(null);
    setUserForm({ username: '', password: '', profileImage: '', role: 'user' });
  };

  return (
    <div className="users-page">
      <h1 className="navbar-title">User Management</h1>
      
      <div className="user-form">
        <h2>{editUser ? 'Update User' : 'Add New User'}</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userForm.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userForm.password}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="profileImage"
          placeholder="Profile Image URL"
          value={userForm.profileImage}
          onChange={handleInputChange}
        />
        <select
          name="role"
          value={userForm.role}
          onChange={handleInputChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div className="form-buttons">
          <button className="add-user-button" onClick={handleAddOrUpdateUser}>
            {editUser ? 'Update User' : 'Add User'}
          </button>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Profile Image</th>
            <th>Role</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} onClick={() => handleEditUser(user)} style={{ cursor: 'pointer' }}>
              <td>{user.username}</td>
              <td>
                <img src={user.profileImage || 'default-image-url.jpg'} alt="Profile" width={50} />
              </td>
              <td>{user.role}</td>
              <td>*****</td>
              <td>
                <div className="user-actions">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPasswords[user.id] || ''}
                    onChange={(e) => handleInputChange(user.id, e.target.value)}
                  />
                  <button className="update-password-button" onClick={() => handlePasswordUpdate(user.id)}>
                    Update Password
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;