import React, { useState, createContext, useContext } from 'react';
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    let initialUserState = undefined;

    try {
        const storedUser = Cookies.get("jwt") || localStorage.getItem("ChatApp");
        initialUserState = storedUser ? JSON.parse(storedUser) : undefined;
    } catch (error) {
        console.error("Error parsing stored auth data:", error);
    }

    const [authUser, setAuthUser] = useState(initialUserState);

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
