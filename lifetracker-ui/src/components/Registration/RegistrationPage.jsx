import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

export default function RegistrationPage({setAppState}) {
  return (
    <div className="registration-page">
      <RegistrationForm setAppState={setAppState}/>
    </div>
  )
}

export function RegistrationForm({setAppState}) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: ""
  })

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
    setIsLoading(true)
    setErrors((e) => ({ ...e, form: null }))

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      setIsLoading(false)
      return
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }))
    }

    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        username:form.username
      })

      if (res?.data?.user) {
        setAppState(res.data)
        setIsLoading(false)
        navigate("/activity")
      } else {
        setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message
      setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
      setIsLoading(false)
    }
  }


  return (
    <div className="registration-form">
        <h1>Sign Up</h1>
        <h2>Email</h2>
        <input className="form-input" name="email" type="email" placeholder="Enter a valid email" value={form.email} onChange={handleOnInputChange}/>

        <h2>Username</h2>
        <input className="form-input" name="username" type="text" placeholder="your_username" value={form.username} onChange={handleOnInputChange}/>

        <div className="two-input-line">
          <input className="form-input" name="firstName" type="text" placeholder="First name" value={form.firstName} onChange={handleOnInputChange}/>
          <input className="form-input" name="lastName" type="text" placeholder="Last name" value={form.lastName} onChange={handleOnInputChange}/>          
        </div>

        <h2>Password</h2>
        <input className="form-input" name="password" type="text" placeholder="Enter a secure password" value={form.password} onChange={handleOnInputChange}/>

        <h2>Confirm Password</h2>
        <input className="form-input" name="passwordConfirm" type="text" placeholder="Confirm your password" value={form.passwordConfirm} onChange={handleOnInputChange}/>      

        <button className="submit-registration" onClick={handleOnSubmit}>Create Account</button>  

        <div className="footer">
          <p>Already have an account? Login <Link to="/login">here</Link></p>
        </div>
      </div>
  )
}