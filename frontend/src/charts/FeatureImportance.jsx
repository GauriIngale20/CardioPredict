import React from "react";

function FeatureImportance({ data = [] }) {
  const values = Array.isArray(data)
    ? data
    : Object.entries(data).map(([feature, importance]) => ({
        feature,
        importance,
      }));

  return (
    <div className="chart-card">
      <h3>Feature Importance</h3>

      {values.map((item, index) => {
        const importance = Number(
          item.importance || item.value || 0
        );

        return (
          <div className="chart-row" key={index}>
            <span>{item.feature}</span>

            <div className="bar">
              <div
                className="bar-fill"
                style={{
                  width: `${Math.min(Math.abs(importance) * 100, 100)}%`,
                }}
              />
            </div>

            <span>{importance.toFixed(2)}</span>
          </div>
        );
      })}
    </div>
  );
}

export default FeatureImportance;