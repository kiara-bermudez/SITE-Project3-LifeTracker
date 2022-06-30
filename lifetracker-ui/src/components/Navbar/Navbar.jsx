import * as React from "react"
import {Link, useNavigate} from 'react-router-dom'
import codepath_logo from "../../assets/codepath_logo.svg"
import "./Navbar.css"

export default function Navbar(props) {
  return (
    <nav className="navbar">
        <Logo />
        <NavLinks setAppState={props.setAppState} appState={props.appState}/>
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

    const handleOnLogout = () => {
        props.setAppState({});
        navigate("/");
    }

    return (
        <div className="nav-links">
            <Link to="/activity" className="link">Activity</Link>
            <Link to="/nutrition" className="link">Nutrition</Link>
            {Boolean(props.appState?.user)?
            <>
                <button className="logout-button" onClick={handleOnLogout}>Logout</button>
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