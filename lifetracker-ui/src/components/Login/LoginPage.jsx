import * as React from "react"
import {Link} from "react-router-dom"
import "./LoginPage.css"

export default function LoginPage() {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  )
}

export function LoginForm() {
  return (
    <div className="login-form">
      <h1>Login</h1>
      <h2>Email</h2>
      <input className="form-input" name="email" type="email" placeholder="user@gmail.com"/>
      <h2>Password</h2>
      <input className="form-input" name="password" type="text" placeholder="password"/>
      <button className="submit-login">Login</button>
      <div className="footer">
        <p>Don't have an account? Sign up <Link to="/register">here</Link></p>
      </div>
    </div>
  )
}