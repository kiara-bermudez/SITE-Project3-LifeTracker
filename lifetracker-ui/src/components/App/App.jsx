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

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  )
}

function App() {
  // const [appState, setAppState] = React.useState({})
  // console.log("appstate", Boolean(appState?.user));
  const {user, setUser} = useAuthContext();
  console.log("user", user, "user?", Boolean(user?.email));
  const [error, setError] = React.useState({});

  // React.useEffect(() => {
  //   const fetchUser = async () => {
  //     const {data, error} = await apiClient.fetchUserFromToken();
  //     console.log("fetched data", data);
  //     if (data) setUser(data.user);
  //     if (error) setError(error);
  //     console.log("fetched user", user);
  //   }

  //   const token = localStorage.getItem("lifetracker_token");
  //   if (token) {
  //     apiClient.setToken(token);
  //     fetchUser();
  //   }
  // }, [setUser])

  // const handleOnLogout = async () => {
  //   await apiClient.logout();
  //   setUser({});
  // }

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />}/> {/* Landing */}

            <Route path="/login" element={ <LoginPage user={user} setUser={setUser}/>}/> {/* LoginPage */}
            
            <Route path="/register" element={ <RegistrationPage user={user} setUser={setUser}/>}/> {/* RegistrationPage */}

            <Route path="/activity" element={Boolean(user?.email)?<ActivityPage  user={user}/>:<AccessForbidden />}/> {/* ActivityPage or AccessForbidden */}

            <Route path="/nutrition/*" element={Boolean(user?.email)?<NutritionPage />:<AccessForbidden />}/> {/* NutritionPage or AccessForbidden */}

            <Route path="/*" element={<NotFound />}/> {/* NotFound */}
            
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
