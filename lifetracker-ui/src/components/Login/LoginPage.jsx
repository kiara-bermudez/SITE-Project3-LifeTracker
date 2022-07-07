import { useLoginForm } from "../../hooks/useLoginForm"
import { Link } from "react-router-dom";
import "./LoginPage.css"

export default function LoginPage() {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  )
}

export function LoginForm() {
  const { form, errors, isProcessing, handleOnInputChange, loginUser } = useLoginForm();

  return (
    <div className="login-form">

      <h1>Login</h1>

      {Boolean(errors.form) && <span className="error">{errors.form}</span>}
        <br />

      <h2>Email</h2>
      {errors.email && <span className="error">{errors.email}</span>}
      <input className="form-input" name="email" type="email" placeholder="user@gmail.com" value={form.email} onChange={handleOnInputChange}/>
      

      <h2>Password</h2>
      <input className="form-input" name="password" type="password" placeholder="password" value={form.password} onChange={handleOnInputChange}/>


      <button className="submit-login" disabled={isProcessing} onClick={loginUser}>{isProcessing ? "Loading..." : "Login"}</button>

      <div className="footer">
        <p>Don't have an account? Sign up <Link to="/register">here</Link></p>
      </div>
    </div>
  )
}