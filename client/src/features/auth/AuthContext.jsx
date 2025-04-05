import { createContext, useContext, useEffect, useState } from "react";
import { getToken, getUserRole, clearToken, getUserId, setToken } from "./services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = getToken();

        if (token) {
            setIsAuthenticated(true);
            setRole(getUserRole());
            setUserId(getUserId());
        } else {
            setIsAuthenticated(false);
            setRole(null);
            setUserId(null);
        }

        setLoading(false);
    }, []);

    const login = (token) => {
        setToken(token);
        setIsAuthenticated(true);
        setRole(getUserRole());
        setUserId(getUserId());
    };

    const logout = () => {
        clearToken();
        setIsAuthenticated(false);
        setRole(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, userId, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);