import * as React from "react"
import {Link} from 'react-router-dom'
import codepath_logo from "../../assets/codepath_logo.svg"
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
        <Logo />
        <NavLinks />
    </nav>

  )
}

export function Logo() {
    return (
        <div className="logo">
            <Link to="/"><img src={codepath_logo} alt="codepath logo"/></Link>
        </div>
    )
}

export function NavLinks() {
    return (
        <div className="nav-links">
            <Link to="/activity" className="link">Activity</Link>
            <Link to="/nutrition" className="link">Nutrition</Link>
            <Link to="/login" className="link">Login</Link>
            <Link to="/register" className="link">Sign Up</Link>
        </div>
    )
}