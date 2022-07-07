import ActivityPage from "components/Activity/ActivityPage"
import AccessForbidden from "components/Error Pages/AccessForbidden"
import LandingPage from "components/Landing/LandingPage"
import LoginPage from "components/Login/LoginPage"
import Navbar from "components/Navbar/Navbar"
import NotFound from "components/Error Pages/NotFound"
import NutritionPage from "components/Nutrition/NutritionPage"
import RegistrationPage from "components/Registration/RegistrationPage"
import * as React from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import "./App.css"
import apiClient from "../../../services/apiClient"
import { AuthContextProvider, useAuthContext } from "../../../contexts/auth"
import { ActivityContextProvider } from "../../../contexts/activity"
import { NutritionContextProvider } from "../../../contexts/nutrition"

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <ActivityContextProvider>
        <NutritionContextProvider>
          <App />
        </NutritionContextProvider>
      </ActivityContextProvider>
    </AuthContextProvider>
  )
}

function App() {
  // const [appState, setAppState] = React.useState({})
  // console.log("appstate", Boolean(appState?.user));
  const {user} = useAuthContext();
  console.log("user", user, "user?", Boolean(user?.email));

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />}/> {/* Landing */}

            <Route path="/login" element={ <LoginPage />}/> {/* LoginPage */}
            
            <Route path="/register" element={ <RegistrationPage />}/> {/* RegistrationPage */}

            <Route path="/activity" element={Boolean(user?.email)?<ActivityPage  />:<AccessForbidden />}/> {/* ActivityPage or AccessForbidden */}

            <Route path="/nutrition/*" element={Boolean(user?.email)?<NutritionPage />:<AccessForbidden />}/> {/* NutritionPage or AccessForbidden */}

            <Route path="/*" element={<NotFound />}/> {/* NotFound */}
            
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
