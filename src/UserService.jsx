// userService.js
import { doc, setDoc, deleteDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { db }from './utils/firebase';

// Function to add a new user
export const addUser = async (user) => {
    try {
        const userRef = doc(collection(db, 'users'), user.id);
        await setDoc(userRef, {
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: new Date(),
        });
        console.log('User added successfully!');
    } catch (error) {
        console.error('Error adding user: ', error);
    }
};

// Function to update user details
export const updateUser = async (userId, updatedData) => {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, updatedData, { merge: true });
        console.log('User updated successfully!');
    } catch (error) {
        console.error('Error updating user: ', error);
    }
};

// Function to delete a user
export const deleteUser = async (userId) => {
    try {
        await deleteDoc(doc(db, 'users', userId));
        console.log('User deleted successfully!');
    } catch (error) {
        console.error('Error deleting user: ', error);
    }
};

// Function to get all users
export const getUsers = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        console.log("No user is signed in. Cannot fetch users.");
        return []; // Return an empty array or handle unauthenticated state
      }
    try {
        
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return usersList;
    } catch (error) {
        console.error('Error fetching users: ', error);
        return [];
    }
};
