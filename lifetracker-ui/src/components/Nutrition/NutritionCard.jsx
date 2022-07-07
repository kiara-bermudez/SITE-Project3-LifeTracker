import * as React from "react"

export default function NutritionCard({ nutrition }) {
    console.log("img", nutrition.imageUrl)
  return (
    <div className="nutrition-card">
        <div className="side-by-side row1">
            <img src={nutrition.image_url} alt={nutrition.name} className="nutrition-image"/>
            <h3 className="nutrition-name">{nutrition.name}</h3>
        </div>
        
        <div className="side-by-side row2">
            <div className="nutrition-calories">
                <p className="nutrition-calories-label">Calories</p>
                <p className="nutrition-calories value">{nutrition.calories}</p>            
            </div>
            
            <div className="nutrition-quantity">
                <p className="nutrition-quantity-label">Quantity</p>
                <p className="nutrition-quantity value">{nutrition.quantity}</p>            
            </div>
        </div>
        
        <div className="side-by-side row3">
            <p className="nutrition-category">{nutrition.category}</p>
            <p className="nutrition-date">{new Date(nutrition.created_at).toLocaleDateString()}
</p>            
        </div>


    </div>
  )
}