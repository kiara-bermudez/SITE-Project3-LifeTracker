import * as React from "react"
import NutritionCard from "./NutritionCard"

export default function NutritionFeed({ nutritions }) {
  console.log("nutritions", nutritions)
  return (
    <div className="nutrition-feed">
      {nutritions.length === 0? <h3 className="empty-message">Nothing here yet</h3>
      : nutritions.map((item, idx) => (
        <NutritionCard />
      ))}
    </div>
  )
}