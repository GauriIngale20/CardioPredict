import React from "react";

function DashboardCard({ title, value, subtitle, icon }) {
  return (
    <div className="dashboard-card">
      {icon && <div className="dashboard-card-icon">{icon}</div>}

      <div className="dashboard-card-content">
        <p>{title}</p>
        <h2>{value}</h2>

        {subtitle && <span>{subtitle}</span>}
      </div>
    </div>
  );
}

export default DashboardCard;