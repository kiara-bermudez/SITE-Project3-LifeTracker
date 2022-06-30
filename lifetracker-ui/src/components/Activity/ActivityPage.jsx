import * as React from "react"

export default function ActivityPage({setAppState, appState, user}) {
  return (
    <div className="activity-page">
      <h1>Activity Page</h1>
      <ActivityFeed />
    </div>
  )
}

export function ActivityFeed({setAppState, appState, user}) {
  return (
    <div className="per-category">
      <h4>Average Calories Per Category</h4>
    </div>
  )
}