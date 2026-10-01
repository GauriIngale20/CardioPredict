import React from "react";

function ChartCard({ title, children }) {
  return (
    <div className="chart-card">
      {title && <h3>{title}</h3>}
      <div>{children}</div>
    </div>
  );
}

export default ChartCard;