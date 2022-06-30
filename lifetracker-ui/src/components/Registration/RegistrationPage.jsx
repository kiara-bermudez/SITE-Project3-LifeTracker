import * as React from "react"
import {Link} from "react-router-dom"

export default function RegistrationPage() {
  return (
    <div className="registration-page">
      <div className="registration-form">
        <h1>Sign Up</h1>
        <h2>Email</h2>
        <input className="form-input" name="email" type="email" placeholder="Enter a valid email"/>
        <h2>Username</h2>
        <input className="form-input" name="username" type="text" placeholder="your_username" />
        <div className="two-input-line">
          <input className="form-input" name="firstName" type="text" placeholder="First name"/>
          <input className="form-input" name="lastName" type="text" placeholder="Last name"/>          
        </div>
        <h2>Password</h2>
        <input className="form-input" name="password" type="text" placeholder="Enter a secure password"/>
        <h2>Confirm Password</h2>
        <input className="form-input" name="passwordConfirm" type="text" placeholder="Confirm your password"/>      
        <button className="submit-registration">Create Account</button>  
        <div className="footer">
          <p>Already have an account? Login <Link to="/login">here</Link></p>
        </div>
      </div>
    </div>
  )
}