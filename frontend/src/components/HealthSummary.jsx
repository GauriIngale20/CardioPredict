import React from "react";

function HealthSummary({ data = {} }) {
  return (
    <div className="health-summary">
      <h3>Health Summary</h3>

      <div className="summary-grid">
        <div>
          <span>Age</span>
          <strong>{data.age ?? "-"}</strong>
        </div>

        <div>
          <span>Blood Pressure</span>
          <strong>{data.trestbps ?? "-"}</strong>
        </div>

        <div>
          <span>Cholesterol</span>
          <strong>{data.chol ?? "-"}</strong>
        </div>

        <div>
          <span>Max Heart Rate</span>
          <strong>{data.thalach ?? "-"}</strong>
        </div>
      </div>
    </div>
  );
}

export default HealthSummary;