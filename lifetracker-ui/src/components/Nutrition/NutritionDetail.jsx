import NotFound from "components/Error Pages/NotFound";
import Loading from "components/Loading/Loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import apiClient from "../../../services/apiClient";
import NutritionCard from "./NutritionCard";


export default function NutritionDetail() {
    const {nutritionId} = useParams();
    const [nutrition, setNutrition] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    let foundId = false;

    useEffect( async () => {
        setIsLoading(true);

        const { data, error } = await apiClient.fetchNutritionById(nutritionId);

        if (error) {
            setErrors((e) => ({error}));
        }
    
        if (data?.nutrition) {
            setNutrition(data.nutrition);
            foundId = true;
        }        

        setIsLoading(false);
    }, [])

    return (
        <div className="nutrition-detail">
            <h1>Nutrition Detail</h1>
            {isLoading? <Loading /> : 
            !foundId? <NotFound /> :
            <NutritionCard nutrition={nutrition}/>
            }
            {}
        </div>
    )
}