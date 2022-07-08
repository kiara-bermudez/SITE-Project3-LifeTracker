import Loading from "components/Loading/Loading";
import * as React from "react"
import { Link } from "react-router-dom";
import { useNutritionContext } from "../../../contexts/nutrition"
import NutritionFeed from "./NutritionFeed";

export default function NutritionOverview() {
  const { nutritions, error, isLoading, nutrInitialized, initialized } = useNutritionContext();

  return (
    <div className="nutrition-overview">
      <div className="side-by-side overview">
        <h1 id="overview-title">Overview</h1>
        <Link to="/nutrition/create" className="record-nutrition">Record Nutrition</Link>
      </div>
      

      {error && <span className="error">{error}</span>}
      {isLoading || !initialized || !nutrInitialized ? <Loading /> : <NutritionFeed nutritions={nutritions}/>}
    </div>
  )
}