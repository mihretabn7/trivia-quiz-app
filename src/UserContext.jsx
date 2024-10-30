// UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from './UserService'; // Adjust the import path accordingly

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                setError('Failed to fetch users.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const addNewUser = async (user) => {
        await addUser(user);
        setUsers((prev) => [...prev, user]); // Update state
    };

    const updateExistingUser = async (userId, updatedData) => {
        await updateUser(userId, updatedData);
        setUsers((prev) => prev.map(user => user.id === userId ? { ...user, ...updatedData } : user)); // Update state
    };

    const removeUser = async (userId) => {
        await deleteUser(userId);
        setUsers((prev) => prev.filter(user => user.id !== userId)); // Update state
    };

    return (
        <UserContext.Provider value={{ users, loading, error, addNewUser, updateExistingUser, removeUser }}>
            {children}
        </UserContext.Provider>
    );
};
