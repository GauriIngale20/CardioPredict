import React, { useState } from "react";

const initialForm = {
  age: "",
  sex: "",
  cp: "",
  trestbps: "",
  chol: "",
  fbs: "",
  restecg: "",
  thalach: "",
  exang: "",
  oldpeak: "",
  slope: "",
  ca: "",
  thal: "",
};

function PredictionForm({ onSubmit, loading = false }) {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const numericData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        Number(value),
      ])
    );

    if (onSubmit) {
      onSubmit(numericData);
    }
  };

  return (
    <form className="prediction-form" onSubmit={handleSubmit}>
      <h2>Heart Disease Prediction</h2>

      {Object.keys(formData).map((field) => (
        <div className="form-group" key={field}>
          <label htmlFor={field}>{field}</label>

          <input
            id={field}
            name={field}
            type="number"
            step={field === "oldpeak" ? "0.1" : "1"}
            value={formData[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <button type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Predict Heart Disease"}
      </button>
    </form>
  );
}

export default PredictionForm;