import Loading from "components/Loading/Loading";
import SummaryStat from "components/Summary Stat/SummaryStat";
import * as React from "react"
import { useActivityContext } from "../../../contexts/activity"
import "./Activity.css"

export default function ActivityPage() {
  const { isLoading, activity } = useActivityContext();
  const totalCaloriesPerDay = activity.nutrition.calories.perDay;
  const avgCaloriesPerCategory = activity.nutrition.calories.perCategory;

  console.log("activity", activity);
  console.log("activity2", activity.nutrition.calories.perDay);

  return (
    <div className="activity-page">
      {isLoading? <Loading /> : <ActivityFeed totalCaloriesPerDay={totalCaloriesPerDay} avgCaloriesPerCategory={avgCaloriesPerCategory}/>}
      
    </div>
  )
}

export function ActivityFeed(props) {
  const sixAvgCaloriesPerCategory = props?.avgCaloriesPerCategory.slice(0,6) || [];
  console.log("avg categories", sixAvgCaloriesPerCategory)
  console.log("per day", props?.totalCaloriesPerDay)

  return (
    <div className="activity-feed">
      <h1>Activity Feed</h1>
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