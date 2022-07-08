import * as React from "react"
import { Link } from "react-router-dom"
import NutritionCard from "./NutritionCard"

export default function NutritionFeed({ nutritions }) {

  return (
    <div className="nutrition-feed">
      {nutritions.length === 0? <h3 className="empty-message">Nothing here yet</h3>
      : <div className="grid">
          {nutritions.map((item, idx) => (
          <Link to={`/nutrition/id/${item.id}`} className="nutrition-card-link"><NutritionCard key={idx} nutrition={item}/></Link>
           ))}
        </div> }
    </div>
  )
}