import Loading from "components/Loading/Loading";
import * as React from "react"
import { Link } from "react-router-dom";
import { useNutritionContext } from "../../../contexts/nutrition"
import NutritionFeed from "./NutritionFeed";

export default function NutritionOverview() {
  const { nutritions, error, isLoading } = useNutritionContext();

  return (
    <div className="nutrition-overview">
      <h1>Overview</h1>

      <Link to="/nutrition/create" >Record Nutrition</Link>

      {error && <span className="error">{error}</span>}
      {isLoading ? <Loading /> : <NutritionFeed nutritions={nutritions}/>}
    </div>
  )
}