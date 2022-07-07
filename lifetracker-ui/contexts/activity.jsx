import { useState, createContext, useContext, useEffect } from "react";
import apiClient from "../services/apiClient";
import { useAuthContext } from "./auth";

const ActivityContext = createContext(null);

export const ActivityContextProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [activity, setActivity] = useState({});
    const [initialized, setInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    console.log("called", user)

    useEffect( () => {
       
        const fetchActivity = async () => {
            const { data, error} = await apiClient.fetchActivityStats();

            console.log("activity data", data);

            if (data) {
                setActivity(data);
                setError(null);
            } 
            if (error) {
                setError(error);
            }

            setIsLoading(false);
            setInitialized(true);
        }

        console.log("called here", user)
        if (user?.email) {
            setIsLoading(true);
            setError(null);
            fetchActivity();
        } else {
            setIsLoading(false);
            setInitialized(true);
        }

        
    },[user])

    const activityValue = {
        activity,
        setActivity,
        initialized,
        setInitialized,
        isLoading,
        setIsLoading,
        error,
        setError
    }

    return (
        <ActivityContext.Provider value={activityValue}>
            <>{children}</>
        </ActivityContext.Provider>
    )
}

export const useActivityContext = () => useContext(ActivityContext);