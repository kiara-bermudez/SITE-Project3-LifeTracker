import * as React from "react"
import heroImage from "../../assets/smartwatch-screen-digital-device.svg"
import "./LandingPage.css"

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="hero">
        <img src={heroImage} className="hero-img"/>
        <div className="cta">
          <h1>Life Tracker</h1>
          <p>Helping you take back control of your world</p>
        </div>
      </div>
    </div>
  )
}