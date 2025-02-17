import NotFound from "components/Error Pages/NotFound"
import * as React from "react"
import {Routes, Route} from "react-router-dom"
import NutritionDetail from "./NutritionDetail"
import NutritionNew from "./NutritionNew"
import NutritionOverview from "./NutritionOverview"
import "./Nutrition.css"

export default function NutritionPage() {
  return (
    <div className="nutrition-page">
      <h1 className="nutrition-page-title">Nutrition</h1>
      <Routes>
        <Route path="/" element={<NutritionOverview />}/>
        <Route path="/create" element={<NutritionNew />}/>
        <Route path="/id/:nutritionId" element={<NutritionDetail />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
