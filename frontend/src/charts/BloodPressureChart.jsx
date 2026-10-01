import React from "react";

function BloodPressureChart({ data = [] }) {
  const values = Array.isArray(data)
    ? data
    : Object.entries(data).map(([pressure, count]) => ({
        pressure,
        count,
      }));

  return (
    <div className="chart-card">
      <h3>Blood Pressure Distribution</h3>

      <div className="simple-chart">
        {values.slice(0, 15).map((item, index) => (
          <div className="chart-row" key={index}>
            <span>{item.pressure}</span>

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

export default BloodPressureChart;