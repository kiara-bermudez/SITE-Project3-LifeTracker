import { useState} from "react"
import { useAuthenticationForm } from "./useAuthenticationForm";
import apiClient from "../../services/apiClient";
import { useAuthContext } from "../../contexts/auth";
import { useNutritionContext } from "../../contexts/nutrition";
import { useNavigate } from "react-router-dom";
import { useActivityContext } from "../../contexts/activity";

export const useNutritionForm = () => {
    const [errors, setErrors] = useState({})
    const [isProcessing, setIsProcessing] = useState(false)
    const [form, setForm] = useState({
      name: "",
      category: "",
      quantity: 1,
      calories: 1,
      imageUrl: ""
    })

    const { nutritions, setNutritions } = useNutritionContext();

    const navigate = useNavigate();
    
    const handleOnInputChange = (event) => {
        if (event.target.name === "quantity") {
          if (event.target.value < 1) {
            setErrors((e) => ({ ...e, quantity: "Quantity should be greater than 0" }))
          } else {
            setErrors((e) => ({ ...e, quantity: null }))
          }
        }
        if (event.target.name === "calories") {
          if (event.target.value < 1) {
            setErrors((e) => ({ ...e, calories: "Calories should be greater than 0" }))
          } else {
            setErrors((e) => ({ ...e, calories: null }))
          }
        }
    
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const handleOnSubmit = async () => {
        setIsProcessing(true);
        setErrors((e) => ({ ...e, form: null }))

        const { data, error } = await apiClient.createNutrition({name:form.name, category:form.category, quantity:form.quantity, calories:form.calories, image_url:form.imageUrl})

        console.log("data123", data, " error123", error)

        if (error) {
            console.log("errors2", error)
            setErrors((e) => ({ ...e, form:error }));
        }
    
        if (data?.nutrition) {
            const nutrition = data.nutrition;
            setNutritions((n) => ({...n, nutrition}));
            //navigate("/nutrition")
        }
    
        setIsProcessing(false);

    }

    return {
        form,
        errors,
        setErrors,
        isProcessing,
        handleOnInputChange,
        handleOnSubmit     
    }
}

