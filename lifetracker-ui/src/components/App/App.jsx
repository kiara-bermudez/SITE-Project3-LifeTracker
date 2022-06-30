import ActivityPage from "components/Activity/ActivityPage"
import AccessForbidden from "components/Error Pages/AccessForbidden"
import LandingPage from "components/Landing/LandingPage"
import LoginPage from "components/Login/LoginPage"
import Navbar from "components/Navbar/Navbar"
import NotFound from "components/Error Pages/NotFound"
import NutritionPage from "components/Nutrition/NutritionPage"
import RegistrationPage from "components/Registration/RegistrationPage"
import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"

export default function App() {
  const [appState, setAppState] = React.useState({})
  console.log("appstate", Boolean(appState?.user));
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar setAppState={setAppState} appState={appState}/>
          <Routes>
            <Route path="/" element={<LandingPage />}/> {/* Landing */}

            <Route path="/login" element={ <LoginPage setAppState={setAppState}/>}/> {/* LoginPage */}
            
            <Route path="/register" element={ <RegistrationPage setAppState={setAppState}/>}/> {/* RegistrationPage */}

            <Route path="/activity" element={Boolean(appState?.user)?<ActivityPage setAppState={setAppState} appState={appState} user={appState?.user}/>:<AccessForbidden />}/> {/* ActivityPage or AccessForbidden */}

            <Route path="/nutrition/*" element={Boolean(appState?.user)?<NutritionPage />:<AccessForbidden />}/> {/* NutritionPage or AccessForbidden */}

            <Route path="/*" element={<NotFound />}/> {/* NotFound */}
            
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
