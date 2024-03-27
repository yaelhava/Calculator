// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(() => {
        const storedUsername = localStorage.getItem('username');
        return storedUsername ? JSON.parse(storedUsername) : null;
    });

    useEffect(() => {
        localStorage.setItem('username', JSON.stringify(username));
    }, [username]);

    return (
        <AuthContext.Provider value={{ username, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
