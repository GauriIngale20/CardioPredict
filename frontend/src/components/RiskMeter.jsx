import React from "react";

function RiskMeter({ risk = 0 }) {
  const value = Math.max(
    0,
    Math.min(100, Number(risk) || 0)
  );

  return (
    <div className="risk-meter">
      <h3>Risk Level</h3>

      <div className="risk-meter-track">
        <div
          className="risk-meter-fill"
          style={{
            width: `${value}%`,
          }}
        />
      </div>

      <div className="risk-meter-label">
        {value.toFixed(0)}%
      </div>
    </div>
  );
}

export default RiskMeter;