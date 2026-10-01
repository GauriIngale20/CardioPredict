import React from "react";

function ModelPerformance({ models = [] }) {
  const modelData = Array.isArray(models)
    ? models
    : Object.entries(models).map(([name, values]) => ({
        name,
        ...values,
      }));

  return (
    <div className="model-performance">
      <h3>Model Performance</h3>

      <div className="model-list">
        {modelData.map((model, index) => (
          <div className="model-item" key={index}>
            <h4>{model.name || model.model}</h4>

            <p>
              Accuracy:{" "}
              {model.accuracy !== undefined
                ? `${(Number(model.accuracy) * 100).toFixed(2)}%`
                : "-"}
            </p>

            {model.precision !== undefined && (
              <p>
                Precision:{" "}
                {(Number(model.precision) * 100).toFixed(2)}%
              </p>
            )}

            {model.recall !== undefined && (
              <p>
                Recall:{" "}
                {(Number(model.recall) * 100).toFixed(2)}%
              </p>
            )}

            {model.f1_score !== undefined && (
              <p>
                F1 Score:{" "}
                {(Number(model.f1_score) * 100).toFixed(2)}%
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModelPerformance;