import React from "react";

function HeartDiseaseDistribution({ data = {} }) {
  const entries = Array.isArray(data)
    ? data
    : Object.entries(data).map(([label, value]) => ({
        label,
        value,
      }));

  return (
    <div className="chart-card">
      <h3>Heart Disease Distribution</h3>

      <div className="distribution">
        {entries.map((item, index) => (
          <div className="distribution-item" key={index}>
            <span>
              {item.label === "1"
                ? "Heart Disease"
                : item.label === "0"
                ? "No Heart Disease"
                : item.label}
            </span>

            <strong>{item.value || item.count || 0}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeartDiseaseDistribution;