import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import apiClient from "../../../services/apiClient"

export default function RegistrationPage({setAppState, user, setUser}) {
  return (
    <div className="registration-page">
      <RegistrationForm setAppState={setAppState} user={user} setUser={setUser}/>
    </div>
  )
}

export function RegistrationForm({setAppState, user, setUser}) {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: ""
  })

  useEffect(() => {
    // if user is already logged in,
    // redirect them to the home page
    if (user?.email) {
      navigate("/")
    }
  }, [user, navigate])

  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async () => {
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


    // try {
    //   const res = await axios.post("http://localhost:3001/auth/register", {
    //     firstName: form.firstName,
    //     lastName: form.lastName,
    //     email: form.email,
    //     password: form.password,
    //     username:form.username
    //   })

    //   if (res?.data?.user) {
    //     setAppState(res.data)
    //     setIsLoading(false)
    //     navigate("/activity")
    //   } else {
    //     setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
    //     setIsLoading(false)
    //   }
    // } catch (err) {
    //   console.log(err)
    //   const message = err?.response?.data?.error?.message
    //   setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
    //   setIsLoading(false)
    // }
  }


  return (
    <div className="registration-form">
        <h1>Sign Up</h1>

        {errors.form && <span className="error">{errors.form}</span>}
        <br />

        <h2>Email</h2>
        {errors.email && <span className="error">{errors.email}</span>}
        <input className="form-input" name="email" type="email" placeholder="Enter a valid email" value={form.email} onChange={handleOnInputChange}/>

        <h2>Username</h2>
        {errors.username && <span className="error">{errors.username}</span>}
        <input className="form-input" name="username" type="text" placeholder="your_username" value={form.username} onChange={handleOnInputChange}/>

        <div className="two-input-line">
          {errors.firstName && <span className="error">{errors.firstName}</span>}
          <input className="form-input" name="firstName" type="text" placeholder="First name" value={form.firstName} onChange={handleOnInputChange}/>

          {errors.lastName && <span className="error">{errors.lastName}</span>}
          <input className="form-input" name="lastName" type="text" placeholder="Last name" value={form.lastName} onChange={handleOnInputChange}/>          
        </div>

        <h2>Password</h2>
        {errors.password && <span className="error">{errors.password}</span>}
        <input className="form-input" name="password" type="text" placeholder="Enter a secure password" value={form.password} onChange={handleOnInputChange}/>

        <h2>Confirm Password</h2>
        {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
        <input className="form-input" name="passwordConfirm" type="text" placeholder="Confirm your password" value={form.passwordConfirm} onChange={handleOnInputChange}/>      

        <button className="submit-registration" onClick={handleOnSubmit}>Create Account</button>  

        <div className="footer">
          <p>Already have an account? Login <Link to="/login">here</Link></p>
        </div>
      </div>
  )
}