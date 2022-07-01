import * as React from "react"
import {Link, useNavigate} from 'react-router-dom'
import codepath_logo from "../../assets/codepath_logo.svg"
import apiClient from "../../../services/apiClient"
import "./Navbar.css"

export default function Navbar(props) {
  return (
    <nav className="navbar">
        <Logo />
        <NavLinks user={props.user} setUser={props.setUser} handleOnLogout={props.handleOnLogout}/>
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

export function NavLinks(props) {
    const navigate = useNavigate();

    return (
        <div className="nav-links">
            <Link to="/activity" className="link">Activity</Link>
            <Link to="/nutrition" className="link">Nutrition</Link>
            {Boolean(props.user?.email)?
            <>
                <button className="logout-button" onClick={ () => {
                    props.handleOnLogout()
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