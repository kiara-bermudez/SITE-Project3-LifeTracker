import { useState, createContext, useContext, useEffect } from "react";
import apiClient from "../services/apiClient";
import { useAuthContext } from "./auth";

const NutritionContext = createContext(null);

export const NutritionContextProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [nutritions, setNutritions] = useState({});
    const [initialized, setInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect( () => {
        
        const fetchNutritions = async () => {
            const { data, error} = await apiClient.fetchUserNutritions();
            //console.log("dataaaa", data)
            if (data) {
                setNutritions(data.nutritions);
                setError(null);
            } 
            if (error) {
                setError(error);
            }

            setIsLoading(false);
            setInitialized(true);
        }

        //console.log("here1", user)
        if (user?.email) {
            setIsLoading(true);
            setError(null);
            fetchNutritions();
        } else {
            setIsLoading(false);
            setInitialized(true);
        }

        
    },[user])

    const nutritionValue = {
        nutritions,
        setNutritions,
        initialized,
        setInitialized,
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