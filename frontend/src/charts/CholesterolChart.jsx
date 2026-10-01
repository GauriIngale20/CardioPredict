import React from "react";

function CholesterolChart({ data = [] }) {
  const values = Array.isArray(data)
    ? data
    : Object.entries(data).map(([cholesterol, count]) => ({
        cholesterol,
        count,
      }));

  return (
    <div className="chart-card">
      <h3>Cholesterol Distribution</h3>

      <div className="simple-chart">
        {values.slice(0, 15).map((item, index) => (
          <div className="chart-row" key={index}>
            <span>{item.cholesterol}</span>

            <div className="bar">
              <div
                className="bar-fill"
                style={{
                  width: `${Math.min(
                    Number(item.count || item.value || 0),
                    100
                  )}%`,
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

export default CholesterolChart;