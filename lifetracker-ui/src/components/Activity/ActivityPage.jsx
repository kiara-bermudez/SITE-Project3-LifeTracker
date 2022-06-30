import * as React from "react"

export default function ActivityPage(props) {
  return (
    <div className="activity-page">
      <h1>Activity Page</h1>
      <ActivityFeed />
    </div>
  )
}

export function ActivityFeed(props) {
  return (
    <div className="per-category">
      <h4>Average Calories Per Category</h4>
    </div>
  )
}