import { useState} from "react"
import { useAuthContext } from "../../contexts/auth";
import { useAuthenticationForm } from "./useAuthenticationForm";
import apiClient from "../../services/apiClient";


export const useLoginForm = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const { form, errors, setErrors, handleOnInputChange} = useAuthenticationForm();
    const { setUser } = useAuthContext();

    const loginUser = async () => {
        setIsProcessing(true);
        setErrors((e) => ({ ...e, form: null }))
    
        const { data, error } = await apiClient.login({ email:form.email, password: form.password});
    
        if (error) {
          setErrors((e) => ({ ...e, form:error }));
        }
    
        if (data?.user) {
          setUser(data.user);
          apiClient.setToken(data.token);
        }
    
        setIsProcessing(false);
    }
  
    return {
        form,
        errors,
        isProcessing,
        handleOnInputChange,
        loginUser
    }

}