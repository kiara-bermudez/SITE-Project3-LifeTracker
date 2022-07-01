import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import apiClient from "../../../services/apiClient"
import "./LoginPage.css"

export default function LoginPage({setAppState, user, setUser}) {
  return (
    <div className="login-page">
      <LoginForm setAppState={setAppState} user={user} setUser={setUser}/>
    </div>
  )
}

export function LoginForm({setAppState, user, setUser}) {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    // if user is already logged in,
    // redirect them to the home page
    if (user?.email) {
      navigate("/activity")
    }
  }, [user, navigate])

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
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

    // try {
    //   const res = await axios.post(`http://localhost:3001/auth/login`, form)
    //   if (res?.data) {
    //     setAppState(res.data)
    //     setIsLoading(false)
    //     navigate("/activity")
    //   } else {
    //     setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
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
    <div className="login-form">

      <h1>Login</h1>

      {Boolean(errors.form) && <span className="error">{errors.form}</span>}
        <br />

      <h2>Email</h2>
      {errors.email && <span className="error">{errors.email}</span>}
      <input className="form-input" name="email" type="email" placeholder="user@gmail.com" value={form.email} onChange={handleOnInputChange}/>
      

      <h2>Password</h2>
      <input className="form-input" name="password" type="text" placeholder="password" value={form.password} onChange={handleOnInputChange}/>

      <button className="submit-login" onClick={handleOnSubmit}>Login</button>

      <div className="footer">
        <p>Don't have an account? Sign up <Link to="/register">here</Link></p>
      </div>
    </div>
  )
}