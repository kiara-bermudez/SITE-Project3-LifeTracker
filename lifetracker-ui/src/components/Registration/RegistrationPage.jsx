import { useRegistrationForm } from "../../hooks/useRegistrationForm"
import { Link } from "react-router-dom";

export default function RegistrationPage() {
  return (
    <div className="registration-page">
      <RegistrationForm />
    </div>
  )
}

export function RegistrationForm() {
  const { form, errors, isProcessing, handleOnInputChange, signupUser } = useRegistrationForm();

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
        <input className="form-input" name="password" type="password" placeholder="Enter a secure password" value={form.password} onChange={handleOnInputChange}/>

        <h2>Confirm Password</h2>
        {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
        <input className="form-input" name="passwordConfirm" type="password" placeholder="Confirm your password" value={form.passwordConfirm} onChange={handleOnInputChange}/>      

        <button className="submit-registration" disabled={isProcessing} onClick={signupUser}>{isProcessing ? "Loading..." : "Create Account"}</button>  

        <div className="footer">
          <p>Already have an account? Login <Link to="/login">here</Link></p>
        </div>
      </div>
  )
}