import * as React from "react"
import NutritionCard from "./NutritionCard"

export default function NutritionFeed({ nutritions }) {

  console.log("nutriiiiiiiiiii", nutritions)

  return (
    <div className="nutrition-feed">
      {nutritions.length === 0? <h3 className="empty-message">Nothing here yet</h3>
      : <div className="grid">
          {nutritions.map((item, idx) => (
          <NutritionCard key={idx} nutrition={item}/>
           ))}
        </div> }
    </div>
  )
}