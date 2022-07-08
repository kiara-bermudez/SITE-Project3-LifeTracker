import * as React from "react"
import "./SummaryStat.css"

export default function SummaryStat({stat, label, substat}) {
  return (
    <div className="summary-stat">
      <div className="secondary-statistic">
        <p>{substat}</p>
      </div>

      <div className="primary-statistic">
        <p>{stat}</p>
      </div>

      <div className="stat-label">
        <p>{label}</p>
      </div>


    </div>
  )
}