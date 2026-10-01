import { useState } from "react";
import { HeartPulse, Activity, Send } from "lucide-react";

import Navbar from "../components/Navbar";
import { predictHeartDisease } from "../services/api";
import "./Prediction.css";

function Prediction() {
  const [formData, setFormData] = useState({
    age: "",
    sex: "1",
    cp: "0",
    trestbps: "",
    chol: "",
    fbs: "0",
    restecg: "0",
    thalach: "",
    exang: "0",
    oldpeak: "",
    slope: "1",
    ca: "0",
    thal: "2",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const patientData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, Number(value)])
      );

      const response = await predictHeartDisease(patientData);

      setResult(response);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to connect to the prediction server. Please make sure the Flask backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-page">
      <Navbar />

      <main className="prediction-container">
        <div className="prediction-header">
          <div className="prediction-icon">
            <HeartPulse size={30} />
          </div>

          <div>
            <span>AI HEALTH ANALYSIS</span>
            <h1>Heart Disease Prediction</h1>
            <p>
              Enter the patient's health parameters to generate an
              ML-powered risk prediction.
            </p>
          </div>
        </div>

        <form className="prediction-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="section-heading">
              <Activity size={20} />
              <h2>Patient Information</h2>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  required
                />
              </div>

              <div className="form-group">
                <label>Sex</label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                >
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label>Chest Pain Type</label>
                <select
                  name="cp"
                  value={formData.cp}
                  onChange={handleChange}
                >
                  <option value="0">Typical Angina</option>
                  <option value="1">Atypical Angina</option>
                  <option value="2">Non-anginal Pain</option>
                  <option value="3">Asymptomatic</option>
                </select>
              </div>

              <div className="form-group">
                <label>Resting Blood Pressure</label>
                <input
                  type="number"
                  name="trestbps"
                  value={formData.trestbps}
                  onChange={handleChange}
                  placeholder="e.g. 120"
                  required
                />
              </div>

              <div className="form-group">
                <label>Cholesterol</label>
                <input
                  type="number"
                  name="chol"
                  value={formData.chol}
                  onChange={handleChange}
                  placeholder="e.g. 200"
                  required
                />
              </div>

              <div className="form-group">
                <label>Fasting Blood Sugar</label>
                <select
                  name="fbs"
                  value={formData.fbs}
                  onChange={handleChange}
                >
                  <option value="0">Normal</option>
                  <option value="1">High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Resting ECG</label>
                <select
                  name="restecg"
                  value={formData.restecg}
                  onChange={handleChange}
                >
                  <option value="0">Normal</option>
                  <option value="1">ST-T Wave Abnormality</option>
                  <option value="2">Left Ventricular Hypertrophy</option>
                </select>
              </div>

              <div className="form-group">
                <label>Maximum Heart Rate</label>
                <input
                  type="number"
                  name="thalach"
                  value={formData.thalach}
                  onChange={handleChange}
                  placeholder="e.g. 150"
                  required
                />
              </div>

              <div className="form-group">
                <label>Exercise Induced Angina</label>
                <select
                  name="exang"
                  value={formData.exang}
                  onChange={handleChange}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label>ST Depression (Oldpeak)</label>
                <input
                  type="number"
                  step="0.1"
                  name="oldpeak"
                  value={formData.oldpeak}
                  onChange={handleChange}
                  placeholder="e.g. 1.0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Slope</label>
                <select
                  name="slope"
                  value={formData.slope}
                  onChange={handleChange}
                >
                  <option value="0">Upsloping</option>
                  <option value="1">Flat</option>
                  <option value="2">Downsloping</option>
                </select>
              </div>

              <div className="form-group">
                <label>Number of Major Vessels (CA)</label>
                <select
                  name="ca"
                  value={formData.ca}
                  onChange={handleChange}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div className="form-group">
                <label>Thalassemia</label>
                <select
                  name="thal"
                  value={formData.thal}
                  onChange={handleChange}
                >
                  <option value="0">Unknown</option>
                  <option value="1">Normal</option>
                  <option value="2">Fixed Defect</option>
                  <option value="3">Reversible Defect</option>
                </select>
              </div>
            </div>
          </div>

          <button className="predict-button" type="submit" disabled={loading}>
            <Send size={19} />
            {loading ? "Analyzing..." : "Predict Heart Disease Risk"}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {result && (
          <div className="prediction-result">
            <h2>Prediction Result</h2>

            <div className="result-grid">
              <div>
                <span>Prediction</span>
                <strong>
                  {result.prediction === 1
                    ? "Heart Disease Detected"
                    : "No Heart Disease"}
                </strong>
              </div>

              <div>
                <span>Probability</span>
                <strong>{result.probability}%</strong>
              </div>

              <div>
                <span>Risk Level</span>
                <strong>{result.risk}</strong>
              </div>
            </div>

            <p className="disclaimer">
              This prediction is for educational and informational purposes
              only and is not a medical diagnosis. Please consult a qualified
              healthcare professional for medical advice.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Prediction;