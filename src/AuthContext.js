// AuthContext.js
import React, { createContext, useState } from 'react';

//redux???????????????????????????????


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(null);

    return (
        <AuthContext.Provider value={{ username, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
