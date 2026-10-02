import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Brain,
  Database,
  HeartPulse,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import Navbar from "../components/Navbar";

import {
  getDataset,
  getFeatureImportance,
  getModelPerformance,
  getStatistics,
} from "../services/api";

import "./dashboard.css";

const PIE_COLORS = ["#e11d48", "#2563eb"];

const CHART_COLORS = {
  primary: "#e11d48",
  secondary: "#2563eb",
  green: "#10b981",
  purple: "#7c3aed",
  orange: "#f59e0b",
};

const tooltipStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  boxShadow: "0 8px 25px rgba(15, 23, 42, 0.12)",
};

function Dashboard() {
  const [statistics, setStatistics] = useState(null);
  const [dataset, setDataset] = useState([]);
  const [modelPerformance, setModelPerformance] = useState({});
  const [featureImportance, setFeatureImportance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        statisticsData,
        datasetData,
        modelData,
        featureData,
      ] = await Promise.all([
        getStatistics(),
        getDataset(),
        getModelPerformance(),
        getFeatureImportance(),
      ]);

      setStatistics(statisticsData);
      setDataset(datasetData?.data || []);
      setModelPerformance(modelData || {});
      setFeatureImportance(featureData || []);
    } catch (err) {
      console.error("Dashboard error:", err);

      setError(
        "Unable to load dashboard data. Please make sure the Flask backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Disease Distribution ---------------- */

  const diseaseData = useMemo(() => {
    if (!statistics) return [];

    return [
      {
        name: "Heart Disease",
        value: Number(statistics.disease_cases) || 0,
      },
      {
        name: "No Disease",
        value: Number(statistics.no_disease_cases) || 0,
      },
    ];
  }, [statistics]);

  /* ---------------- Age Distribution ---------------- */

  const ageData = useMemo(() => {
    if (!dataset.length) return [];

    const ranges = [
      { label: "20–29", min: 20, max: 29 },
      { label: "30–39", min: 30, max: 39 },
      { label: "40–49", min: 40, max: 49 },
      { label: "50–59", min: 50, max: 59 },
      { label: "60–69", min: 60, max: 69 },
      { label: "70–79", min: 70, max: 79 },
    ];

    return ranges.map((range) => ({
      age: range.label,
      patients: dataset.filter(
        (item) =>
          Number(item.age) >= range.min &&
          Number(item.age) <= range.max
      ).length,
    }));
  }, [dataset]);

  /* ---------------- Cholesterol ---------------- */

  const cholesterolData = useMemo(() => {
    if (!dataset.length) return [];

    const ranges = [
      { label: "<200", min: 0, max: 199 },
      { label: "200–239", min: 200, max: 239 },
      { label: "240–279", min: 240, max: 279 },
      { label: "280+", min: 280, max: Infinity },
    ];

    return ranges.map((range) => ({
      range: range.label,
      patients: dataset.filter(
        (item) =>
          Number(item.chol) >= range.min &&
          Number(item.chol) <= range.max
      ).length,
    }));
  }, [dataset]);

  /* ---------------- Blood Pressure ---------------- */

  const bloodPressureData = useMemo(() => {
    if (!dataset.length) return [];

    const ranges = [
      { label: "<120", min: 0, max: 119 },
      { label: "120–129", min: 120, max: 129 },
      { label: "130–139", min: 130, max: 139 },
      { label: "140–159", min: 140, max: 159 },
      { label: "160+", min: 160, max: Infinity },
    ];

    return ranges.map((range) => ({
      range: range.label,
      patients: dataset.filter(
        (item) =>
          Number(item.trestbps) >= range.min &&
          Number(item.trestbps) <= range.max
      ).length,
    }));
  }, [dataset]);

  /* ---------------- Heart Rate ---------------- */

  const heartRateData = useMemo(() => {
    if (!dataset.length) return [];

    const ranges = [
      { label: "<100", min: 0, max: 99 },
      { label: "100–119", min: 100, max: 119 },
      { label: "120–139", min: 120, max: 139 },
      { label: "140–159", min: 140, max: 159 },
      { label: "160+", min: 160, max: Infinity },
    ];

    return ranges.map((range) => ({
      range: range.label,
      patients: dataset.filter(
        (item) =>
          Number(item.thalach) >= range.min &&
          Number(item.thalach) <= range.max
      ).length,
    }));
  }, [dataset]);

  /* ---------------- Model Performance ---------------- */

  const modelData = useMemo(() => {
    return Object.entries(modelPerformance).map(
      ([name, metrics]) => ({
        model:
          name === "Logistic Regression"
            ? "Logistic Regression"
            : "Random Forest",

        accuracy: Number(metrics.accuracy) || 0,
        precision: Number(metrics.precision) || 0,
        recall: Number(metrics.recall) || 0,
        f1: Number(metrics.f1_score) || 0,
      })
    );
  }, [modelPerformance]);

  /* ---------------- Feature Importance ---------------- */

  const topFeatures = useMemo(() => {
    return featureImportance
      .slice(0, 8)
      .map((item) => ({
        feature: item.feature,
        importance: Number(item.importance) || 0,
      }));
  }, [featureImportance]);

  /* ---------------- Loading ---------------- */

  if (loading) {
    return (
      <div className="dashboard-page">
        <Navbar />

        <div className="dashboard-loading">
          <div className="loading-spinner"></div>

          <h2>Loading Dashboard</h2>

          <p>
            Preparing heart health analytics...
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- Error ---------------- */

  if (error) {
    return (
      <div className="dashboard-page">
        <Navbar />

        <div className="dashboard-error">
          <div className="error-icon">
            <Activity size={30} />
          </div>

          <h2>Dashboard Unavailable</h2>

          <p>{error}</p>

          <button onClick={loadDashboard}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-container">

        {/* ================= HEADER ================= */}

        <section className="dashboard-header">

          <div>
            <div className="dashboard-label">
              <BarChart3 size={16} />
              HEALTH ANALYTICS
            </div>

            <h1>
              Heart Health Dashboard
            </h1>

            <p>
              Explore patient data, cardiovascular health
              parameters, disease distribution, and machine
              learning model performance.
            </p>
          </div>

          <button
            className="refresh-button"
            onClick={loadDashboard}
          >
            <RefreshCw size={17} />
            Refresh Data
          </button>

        </section>

        {/* ================= KPI CARDS ================= */}

        <section className="kpi-grid">

          <div className="kpi-card red-card">

            <div className="kpi-icon">
              <Database size={24} />
            </div>

            <div>
              <span>Total Records</span>

              <strong>
                {statistics.rows.toLocaleString()}
              </strong>

              <small>
                Patient records
              </small>
            </div>

          </div>

          <div className="kpi-card pink-card">

            <div className="kpi-icon">
              <HeartPulse size={24} />
            </div>

            <div>
              <span>Disease Cases</span>

              <strong>
                {statistics.disease_cases}
              </strong>

              <small>
                {(
                  (statistics.disease_cases /
                    statistics.rows) *
                  100
                ).toFixed(1)}
                % of dataset
              </small>
            </div>

          </div>

          <div className="kpi-card blue-card">

            <div className="kpi-icon">
              <ShieldCheck size={24} />
            </div>

            <div>
              <span>No Disease</span>

              <strong>
                {statistics.no_disease_cases}
              </strong>

              <small>
                {(
                  (statistics.no_disease_cases /
                    statistics.rows) *
                  100
                ).toFixed(1)}
                % of dataset
              </small>
            </div>

          </div>

          <div className="kpi-card purple-card">

            <div className="kpi-icon">
              <Brain size={24} />
            </div>

            <div>
              <span>Health Features</span>

              <strong>13</strong>

              <small>
                ML input features
              </small>
            </div>

          </div>

        </section>

        {/* ================= OVERVIEW ================= */}

        <section className="dashboard-grid two-column">

          {/* Disease Pie Chart */}

          <div className="chart-card">

            <div className="chart-header">

              <div>
                <span>DISEASE OVERVIEW</span>

                <h2>
                  Heart Disease Distribution
                </h2>
              </div>

              <HeartPulse size={22} />

            </div>

            <div className="chart-area pie-area">

              <ResponsiveContainer
                width="100%"
                height={280}
              >

                <PieChart>

                  <Pie
                    data={diseaseData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                    stroke="#ffffff"
                    strokeWidth={3}
                  >

                    {diseaseData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            PIE_COLORS[index %
                              PIE_COLORS.length]
                          }
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip
                    contentStyle={tooltipStyle}
                  />

                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Age Chart */}

          <div className="chart-card">

            <div className="chart-header">

              <div>
                <span>AGE ANALYSIS</span>

                <h2>
                  Patient Age Distribution
                </h2>
              </div>

              <Activity size={22} />

            </div>

            <div className="chart-area">

              <ResponsiveContainer
                width="100%"
                height={280}
              >

                <BarChart
                  data={ageData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -15,
                    bottom: 5,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="age"
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                    axisLine={{
                      stroke: "#cbd5e1",
                    }}
                  />

                  <YAxis
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                    axisLine={false}
                  />

                  <Tooltip
                    contentStyle={tooltipStyle}
                  />

                  <Bar
                    dataKey="patients"
                    name="Patients"
                    fill={CHART_COLORS.primary}
                    radius={[7, 7, 0, 0]}
                    barSize={34}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </section>

        {/* ================= HEALTH PARAMETERS ================= */}

        <section className="section-title">

          <span>
            HEALTH PARAMETERS
          </span>

          <h2>
            Patient Health Analysis
          </h2>

          <p>
            Distribution of important cardiovascular
            health parameters.
          </p>

        </section>

        <section className="dashboard-grid three-column">

          {/* Cholesterol */}

          <div className="chart-card small-chart">

            <div className="chart-header">

              <div>
                <span>CHOLESTEROL</span>

                <h2>
                  Cholesterol Levels
                </h2>
              </div>

            </div>

            <ResponsiveContainer
              width="100%"
              height={230}
            >

              <BarChart
                data={cholesterolData}
                margin={{
                  top: 10,
                  right: 5,
                  left: -20,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="range"
                  tick={{
                    fill: "#64748b",
                    fontSize: 11,
                  }}
                />

                <YAxis
                  tick={{
                    fill: "#64748b",
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                />

                <Bar
                  dataKey="patients"
                  name="Patients"
                  fill={CHART_COLORS.primary}
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* Blood Pressure */}

          <div className="chart-card small-chart">

            <div className="chart-header">

              <div>
                <span>BLOOD PRESSURE</span>

                <h2>
                  Resting BP
                </h2>
              </div>

            </div>

            <ResponsiveContainer
              width="100%"
              height={230}
            >

              <BarChart
                data={bloodPressureData}
                margin={{
                  top: 10,
                  right: 5,
                  left: -20,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="range"
                  tick={{
                    fill: "#64748b",
                    fontSize: 11,
                  }}
                />

                <YAxis
                  tick={{
                    fill: "#64748b",
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                />

                <Bar
                  dataKey="patients"
                  name="Patients"
                  fill={CHART_COLORS.secondary}
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* Heart Rate */}

          <div className="chart-card small-chart">

            <div className="chart-header">

              <div>
                <span>HEART RATE</span>

                <h2>
                  Maximum Heart Rate
                </h2>
              </div>

            </div>

            <ResponsiveContainer
              width="100%"
              height={230}
            >

              <BarChart
                data={heartRateData}
                margin={{
                  top: 10,
                  right: 5,
                  left: -20,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="range"
                  tick={{
                    fill: "#64748b",
                    fontSize: 11,
                  }}
                />

                <YAxis
                  tick={{
                    fill: "#64748b",
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                />

                <Bar
                  dataKey="patients"
                  name="Patients"
                  fill={CHART_COLORS.green}
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </section>

        {/* ================= ML ================= */}

        <section className="section-title">

          <span>
            MACHINE LEARNING
          </span>

          <h2>
            Model Performance
          </h2>

          <p>
            Comparison of trained classification models
            across key evaluation metrics.
          </p>

        </section>

        <section className="dashboard-grid two-column">

          {/* Model Performance */}

          <div className="chart-card">

            <div className="chart-header">

              <div>
                <span>MODEL COMPARISON</span>

                <h2>
                  Performance Metrics
                </h2>
              </div>

              <Brain size={22} />

            </div>

            <ResponsiveContainer
              width="100%"
              height={310}
            >

              <BarChart
                data={modelData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -10,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="model"
                  tick={{
                    fill: "#64748b",
                    fontSize: 11,
                  }}
                />

                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(value) =>
                    `${value}%`
                  }
                  tick={{
                    fill: "#64748b",
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  formatter={(value) =>
                    `${value}%`
                  }
                  contentStyle={tooltipStyle}
                />

                <Legend />

                <Bar
                  dataKey="accuracy"
                  name="Accuracy"
                  fill="#e11d48"
                  radius={[5, 5, 0, 0]}
                  barSize={16}
                />

                <Bar
                  dataKey="precision"
                  name="Precision"
                  fill="#2563eb"
                  radius={[5, 5, 0, 0]}
                  barSize={16}
                />

                <Bar
                  dataKey="recall"
                  name="Recall"
                  fill="#10b981"
                  radius={[5, 5, 0, 0]}
                  barSize={16}
                />

                <Bar
                  dataKey="f1"
                  name="F1 Score"
                  fill="#7c3aed"
                  radius={[5, 5, 0, 0]}
                  barSize={16}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* Feature Importance */}

          <div className="chart-card">

            <div className="chart-header">

              <div>
                <span>FEATURE ANALYSIS</span>

                <h2>
                  Top Important Features
                </h2>
              </div>

              <TrendingUp size={22} />

            </div>

            <ResponsiveContainer
              width="100%"
              height={310}
            >

              <BarChart
                data={topFeatures}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 20,
                  left: 20,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#e2e8f0"
                />

                <XAxis
                  type="number"
                  tickFormatter={(value) =>
                    `${value}%`
                  }
                  tick={{
                    fill: "#64748b",
                    fontSize: 11,
                  }}
                />

                <YAxis
                  type="category"
                  dataKey="feature"
                  width={70}
                  tick={{
                    fill: "#475569",
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  formatter={(value) =>
                    `${value}%`
                  }
                  contentStyle={tooltipStyle}
                />

                <Bar
                  dataKey="importance"
                  name="Importance"
                  fill={CHART_COLORS.purple}
                  radius={[0, 7, 7, 0]}
                  barSize={20}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </section>

        {/* ================= INSIGHTS ================= */}

        <section className="section-title">

          <span>
            DATASET INSIGHTS
          </span>

          <h2>
            Data Quality & Project Summary
          </h2>

        </section>

        <section className="insights-grid">

          <div className="insight-card">

            <Database size={25} />

            <h3>
              Dataset
            </h3>

            <p>
              The dataset contains{" "}
              <strong>
                {statistics.rows.toLocaleString()}
              </strong>{" "}
              patient records and{" "}
              <strong>
                {statistics.columns}
              </strong>{" "}
              columns.
            </p>

          </div>

          <div className="insight-card">

            <ShieldCheck size={25} />

            <h3>
              Data Quality
            </h3>

            <p>
              The dataset currently contains{" "}
              <strong>
                {statistics.missing_values}
              </strong>{" "}
              missing values.
            </p>

          </div>

          <div className="insight-card">

            <Brain size={25} />

            <h3>
              ML Models
            </h3>

            <p>
              The application evaluates Logistic Regression
              and Random Forest classification models.
            </p>

          </div>

          <div className="insight-card">

            <HeartPulse size={25} />

            <h3>
              Prediction
            </h3>

            <p>
              The prediction system analyzes 13
              health-related input parameters to generate
              a classification result.
            </p>

          </div>

        </section>

        {/* ================= DISCLAIMER ================= */}

        <div className="dashboard-disclaimer">

          <ShieldCheck size={21} />

          <p>
            This dashboard is designed for educational and
            analytical purposes. Machine learning predictions
            should not be considered medical diagnosis or a
            substitute for professional medical advice.
          </p>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;
