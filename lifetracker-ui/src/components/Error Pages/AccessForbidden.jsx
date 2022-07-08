import * as React from "react"
import { Link } from "react-router-dom"
import "./ErrorPages.css"

export default function AccessForbidden() {
  return (
    <div className="access-forbidden error-page">
      <h1>Access Forbidden</h1>
      <Link to="/login" className="login-link">Login Here</Link>
    </div>
  )
}