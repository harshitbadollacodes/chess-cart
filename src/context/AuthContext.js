import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function setupAuthHeaderForServiceCalls(token) {
    
    if (token) {
      return (axios.defaults.headers.common["Authorization"] = token);
    }
    delete axios.defaults.headers.common["Authorization"];
}

export function AuthProvider({ children }){ 
    
    const { userId: savedUserId, token: savedToken } = JSON.parse(localStorage.getItem("userDetails")) || {userId: null, token: null};

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [token, setToken] = useState(savedToken);
    const [userId, setUserId] = useState(savedUserId);

    axios.interceptors.response.use((response) => response,
        (error) => {
            if (error?.response?.status === 401) {
                logout();
            }

            return Promise.reject(error);
        }
    );

    function logout() {
        setIsUserLoggedIn(false);
        setToken(null);
        setUserId(null);
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider 
            value={{ 
                isUserLoggedIn,
                setIsUserLoggedIn,
                token,
                userId,
                setToken,
                setUserId
            }}
        >
            {children}
        </AuthContext.Provider>
    );   
};

export function useAuthContext() {
    return useContext(AuthContext);
}