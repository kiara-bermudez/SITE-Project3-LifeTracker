import { useNutritionForm } from "../../hooks/useNutritionForm";
import * as React from "react"

export default function NutritionForm() {
  const { form, errors, handleOnInputChange, handleOnSubmit, isProcessing} = useNutritionForm();

  return (
    <div className="nutrition-form">
      <h1>Record Nutrition</h1>

      {Boolean(errors.form) && <span className="error">{errors.form}</span>}
      <br />

      <h2>Name</h2>
      <input className="form-input" name="name" type="text" placeholder="Nutrition Name" value={form.name} onChange={handleOnInputChange}/>

      <h2>Category</h2>
      <input className="form-input" name="category" type="text" placeholder="Nutrition Category" value={form.category} onChange={handleOnInputChange}/>

      <div className="two-input-line">
        <div className="first-input">
          <h2>Quantity</h2>
          {errors.quantity && <span className="error">{errors.quantity}</span>}
          <input className="form-input" name="quantity" type="number" placeholder="1" value={form.quantity} onChange={handleOnInputChange}/>
        </div>
        <div className="second-input">
          <h2>Calories</h2>
          {errors.calories && <span className="error">{errors.calories}</span>}
          <input className="form-input" name="calories" type="number" placeholder="1" value={form.calories} onChange={handleOnInputChange}/> 
        </div>

               
      </div>
      
      <h2>Image URL</h2>
      <input className="form-input" name="imageUrl" type="url" placeholder="https://www.food-image.com/1" pattern="https://.*" value={form.imageUrl} onChange={handleOnInputChange}/>

      <button className="submit-nutrition" onClick={handleOnSubmit}>{isProcessing ? "Loading..." : "Save"}</button>
    </div>
  )
}