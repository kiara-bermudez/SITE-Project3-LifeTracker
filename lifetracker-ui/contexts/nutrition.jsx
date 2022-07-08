import { useState, createContext, useContext, useEffect } from "react";
import apiClient from "../services/apiClient";
import { useAuthContext } from "./auth";

const NutritionContext = createContext(null);

export const NutritionContextProvider = ({ children }) => {
    const { user, initialized } = useAuthContext();
    const [nutritions, setNutritions] = useState([]);
    const [nutrInitialized, setNutrInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect( () => {
        
        const fetchNutritions = async () => {
            const { data, error} = await apiClient.fetchUserNutritions();
            if (data) {
                setNutritions(data.nutritions);
                setError(null);
            } 
            if (error) {
                setError(error);
            }

            setIsLoading(false);
            setNutrInitialized(true);
        }

        if (user?.email) {
            setIsLoading(true);
            setError(null);
            fetchNutritions();
        } else {
            setIsLoading(false);
            setNutrInitialized(true);
        }

        
    },[user])

    const nutritionValue = {
        nutritions,
        setNutritions,
        initialized,
        nutrInitialized,
        isLoading,
        setIsLoading,
        error,
        setError
    }

    return (
        <NutritionContext.Provider value={nutritionValue}>
            <>{children}</>
        </NutritionContext.Provider>
    )
}

export const useNutritionContext = () => useContext(NutritionContext);