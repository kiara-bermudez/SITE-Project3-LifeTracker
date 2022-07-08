import Loading from "components/Loading/Loading";
import SummaryStat from "components/Summary Stat/SummaryStat";
import * as React from "react"
import { useActivityContext } from "../../../contexts/activity"
import { Link } from "react-router-dom"
import "./Activity.css"

export default function ActivityPage() {
  const { isLoading, activity, initialized, actInitialized } = useActivityContext();

  let totalCaloriesPerDay = [];
  let avgCaloriesPerCategory = []; 
  if (!isLoading && initialized && actInitialized) {
    totalCaloriesPerDay = activity.nutrition.calories.perDay || [];
    avgCaloriesPerCategory = activity.nutrition.calories.perCategory || [];
  }

  return (
    <div className="activity-page">
      <h1 className="activity-page-title">Activity Feed</h1>
      <Link to="/nutrition/create" className="record-nutrition">Record Nutrition</Link>
      {isLoading? <Loading /> : <ActivityFeed activity={activity} totalCaloriesPerDay={totalCaloriesPerDay} avgCaloriesPerCategory={avgCaloriesPerCategory}/>}
      
    </div>
  )
}

export function ActivityFeed(props) {
  const sixAvgCaloriesPerCategory = props?.avgCaloriesPerCategory.slice(0,6) || [];

  return (
    <div className="activity-feed">
      <div className="per-category">
        <h4>Average Calories Per Category</h4>
        <div className="grid">
          {sixAvgCaloriesPerCategory.map((item,idx) => (
            <SummaryStat key={idx} stat={item.avgCaloriesPerCategory} label={"calories"} substat={item.category}/>
         ))}
        </div>
      </div>

      <div className="per-day">
        <h4>Total Calories Per Day</h4>
        <div className="grid">
          {props?.totalCaloriesPerDay.map((item,idx) => (
            <SummaryStat key={idx} stat={item.totalCaloriesPerDay} label={"calories"} substat={item.date}/>
          ))}  
        </div>
              
      </div>
      
    </div>
  )
}