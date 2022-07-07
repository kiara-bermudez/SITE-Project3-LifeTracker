import { useState, createContext, useContext, useEffect } from "react";
import apiClient from "../services/apiClient";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [initialized, setInitialized] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);

    const loginUser = async (e) => {
        setIsProcessing(true);
        setError((e) => ({ ...e, form: null }))
    
        const { data, error } = await apiClient.login({ email:form.email, password: form.password});
    
        if (error) {
          setError((e) => ({ ...e, form:error }));
        }
    
        if (data?.user) {
          setUser(data.user);
          apiClient.setToken(data.token);
        }
    
        setIsProcessing(false);
    }

    const logoutUser = async () => {
        await apiClient.logout();
        setUser({});
    }    

    const authValue = {
        user,
        setUser,
        initialized,
        setInitialized,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        loginUser,
        logoutUser
    }

    // Set user state if logged in using token
    useEffect(() => {
        const fetchUser = async () => {
            const {data, error} = await apiClient.fetchUserFromToken();
            console.log("fetched data", data);
            if (data) {
                setUser(data.user);
                setError(null);
            } 
            if (error) {
                setError(error);
            }
            console.log("fetched user", user);
        }

        // Check to see if JWT token exists in local storage
        const token = localStorage.getItem("lifetracker_token");
        if (token) {
            apiClient.setToken(token);
            setIsProcessing(true);
            setError(null);
            fetchUser();
        }

        setIsProcessing(false);
        setInitialized(true);
    }, [setUser])



    return (
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);