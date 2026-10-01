import React from "react";

function PredictionHistory({ history = [] }) {
  return (
    <div className="prediction-history">
      <h3>Prediction History</h3>

      {history.length === 0 ? (
        <p>No predictions available.</p>
      ) : (
        <div className="history-list">
          {history.map((item, index) => (
            <div className="history-item" key={index}>
              <span>
                Prediction {index + 1}
              </span>

              <strong>
                {item.prediction ??
                  item.result ??
                  item.risk ??
                  "-"}
              </strong>

              {item.date && <small>{item.date}</small>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PredictionHistory;