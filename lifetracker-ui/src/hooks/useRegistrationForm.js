import { useState} from "react"
import { useAuthenticationForm } from "./useAuthenticationForm";
import apiClient from "../../services/apiClient";
import { useAuthContext } from "../../contexts/auth";


export const useRegistrationForm = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const { form, errors, setErrors, handleOnInputChange} = useAuthenticationForm();
    const { setUser } = useAuthContext();

    const signupUser = async () => {
        setIsProcessing(true)
        setErrors((e) => ({ ...e, form: null }))
    
        if (form.passwordConfirm !== form.password) {
          setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
          setIsProcessing(false)
          return
        } else {
          setErrors((e) => ({ ...e, passwordConfirm: null }))
        }
    
        const { data, error } = await apiClient.signup({ email:form.email, password: form.password, username: form.username, firstName: form.firstName, lastName: form.lastName});
    
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
        signupUser
    }

}