import { useState, createContext, useContext, useEffect } from "react";
import apiClient from "../services/apiClient";
import { useAuthContext } from "./auth";

const ActivityContext = createContext(null);

export const ActivityContextProvider = ({ children }) => {
    const { user, initialized } = useAuthContext();
    const [activity, setActivity] = useState({});
    const [actInitialized, setActInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect( () => {
       
        const fetchActivity = async () => {
            const { data, error} = await apiClient.fetchActivityStats();

            if (data) {
                setActivity(data);
                setError(null);
            } 
            if (error) {
                setError(error);
            }

            setIsLoading(false);
            setActInitialized(true);
        }

        console.log("initialized", initialized)

        if (initialized) {
            if (user?.email) {
                setIsLoading(true);
                setError(null);
                fetchActivity();
            } else {
                setIsLoading(false);
                setActInitialized(true);
            }
        }



        
    },[initialized])

    const activityValue = {
        activity,
        setActivity,
        initialized,
        actInitialized,
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