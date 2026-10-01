import React from "react";

function AgeDistribution({ data = [] }) {
  const values = Array.isArray(data)
    ? data
    : Object.entries(data).map(([age, count]) => ({
        age,
        count,
      }));

  return (
    <div className="chart-card">
      <h3>Age Distribution</h3>

      <div className="simple-chart">
        {values.map((item, index) => (
          <div className="chart-row" key={index}>
            <span>{item.age}</span>
            <div className="bar">
              <div
                className="bar-fill"
                style={{
                  width: `${Math.min(Number(item.count || item.value || 0), 100)}%`,
                }}
              />
            </div>
            <span>{item.count || item.value || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgeDistribution;