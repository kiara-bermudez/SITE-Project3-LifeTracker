import ActivityPage from "components/Activity/ActivityPage"
import LandingPage from "components/Landing/LandingPage"
import LoginPage from "components/Login/LoginPage"
import Navbar from "components/Navbar/Navbar"
import NotFound from "components/NotFound/NotFound"
import NutritionPage from "components/Nutrition/NutritionPage"
import RegistrationPage from "components/Registration/RegistrationPage"
import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"

export default function App() {
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<><Navbar /> <LandingPage /></>}/> {/* Landing */}
            <Route path="/login" element={<><Navbar /> <LoginPage /></>}/> {/* LoginPage */}
            <Route path="/register" element={<><Navbar /> <RegistrationPage /></>}/> {/* RegistrationPage */}
            <Route path="/activity" element={<><Navbar /> <ActivityPage /></>}/> {/* ActivityPage or AccessForbidden */}
            <Route path="/nutrition/*" element={<><Navbar /> <NutritionPage /></>}/> {/* NutritionPage or AccessForbidden */}
            <Route path="/*" element={<><Navbar /><NotFound /></>}/> {/* NotFound */}
            <Route path="*" element={<Navbar />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
