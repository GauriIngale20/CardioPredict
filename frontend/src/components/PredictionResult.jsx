import React from "react";

function PredictionResult({ result }) {
  if (!result) {
    return null;
  }

  const prediction =
    result.prediction ??
    result.result ??
    result.risk ??
    "Unknown";

  return (
    <div className="prediction-result">
      <h3>Prediction Result</h3>

      <div className="result-value">
        {prediction}
      </div>

      {result.probability !== undefined && (
        <p>
          Probability:{" "}
          {(Number(result.probability) * 100).toFixed(2)}%
        </p>
      )}

      {result.message && (
        <p>{result.message}</p>
      )}
    </div>
  );
}

export default PredictionResult;