import React from "react";

function RiskDistribution({ data = {} }) {
  const entries = Array.isArray(data)
    ? data
    : Object.entries(data).map(([risk, count]) => ({
        risk,
        count,
      }));

  return (
    <div className="chart-card">
      <h3>Risk Distribution</h3>

      <div className="distribution">
        {entries.map((item, index) => (
          <div className="distribution-item" key={index}>
            <span>{item.risk || item.label}</span>
            <strong>{item.count || item.value || 0}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RiskDistribution;