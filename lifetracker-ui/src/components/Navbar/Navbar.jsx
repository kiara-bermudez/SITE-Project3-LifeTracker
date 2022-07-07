import * as React from "react"
import {Link, useNavigate} from 'react-router-dom'
import codepath_logo from "../../assets/codepath_logo.svg"
import { useAuthContext } from "../../../contexts/auth"
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
    const navigate = useNavigate();
    const { user, logoutUser } = useAuthContext();

    return (
        <div className="nav-links">
            <Link to="/activity" className="link">Activity</Link>
            <Link to="/nutrition" className="link">Nutrition</Link>
            {Boolean(user?.email)?
            <>
                <button className="logout-button" onClick={ () => {
                    logoutUser()
                    navigate("/");
                }}>Logout</button>
                
            </>
            :
            <>
                <Link to="/login" className="link">Login</Link>
                <Link to="/register" className="link">Sign Up</Link>
            </>
            }
            
            
            
        </div>
    )
}