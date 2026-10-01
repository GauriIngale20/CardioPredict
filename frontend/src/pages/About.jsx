import {
  Activity,
  Brain,
  Database,
  HeartPulse,
  LineChart,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import Navbar from "../components/Navbar";
import "./About.css";

function About() {
  const technologies = [
    {
      icon: Brain,
      title: "Machine Learning",
      text: "Logistic Regression and Random Forest models are used for heart disease prediction.",
    },
    {
      icon: Database,
      title: "Data Processing",
      text: "The heart disease dataset is processed, analyzed, and prepared for machine learning.",
    },
    {
      icon: LineChart,
      title: "Data Visualization",
      text: "Interactive charts present dataset insights, model performance, and feature importance.",
    },
    {
      icon: Activity,
      title: "Prediction API",
      text: "A Flask REST API connects the machine learning backend with the frontend application.",
    },
  ];

  const features = [
    "Heart disease risk prediction",
    "Interactive health parameter form",
    "Dataset statistics and insights",
    "Model performance comparison",
    "Feature importance analysis",
    "Interactive data visualizations",
  ];

  return (
    <div className="about-page">
      <Navbar />

      <main className="about-container">
        {/* Hero */}
        <section className="about-hero">
          <div className="about-hero-icon">
            <HeartPulse size={42} />
          </div>

          <span className="about-label">ABOUT CARDIOPREDICT</span>

          <h1>
            Intelligent Insights for
            <span> Heart Health</span>
          </h1>

          <p>
            CardioPredict is a machine-learning based heart health analysis
            application designed to analyze patient health parameters and
            generate an easy-to-understand heart disease risk prediction.
          </p>
        </section>

        {/* Overview */}
        <section className="about-overview">
          <div className="overview-card">
            <div className="overview-icon">
              <Stethoscope size={25} />
            </div>

            <h2>What is CardioPredict?</h2>

            <p>
              CardioPredict combines data analysis, machine learning, and
              interactive visualization to provide a complete view of heart
              health data. Users can enter health parameters and receive a
              model-generated prediction through the application.
            </p>

            <p>
              The dashboard also provides dataset statistics, disease
              distribution, model performance, and feature importance to make
              the analysis easier to understand.
            </p>
          </div>

          <div className="overview-side">
            <div className="mini-card">
              <HeartPulse size={24} />
              <strong>13</strong>
              <span>Health Features</span>
            </div>

            <div className="mini-card">
              <Database size={24} />
              <strong>1,025</strong>
              <span>Patient Records</span>
            </div>

            <div className="mini-card">
              <Brain size={24} />
              <strong>2</strong>
              <span>ML Models</span>
            </div>

            <div className="mini-card">
              <ShieldCheck size={24} />
              <strong>0</strong>
              <span>Missing Values</span>
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="about-section">
          <div className="section-heading-about">
            <span>TECHNOLOGY</span>
            <h2>Built with Modern Data & ML Technologies</h2>
            <p>
              The application combines a machine learning backend with an
              interactive React frontend.
            </p>
          </div>

          <div className="technology-grid">
            {technologies.map((item) => {
              const Icon = item.icon;

              return (
                <div className="technology-card" key={item.title}>
                  <div className="technology-icon">
                    <Icon size={24} />
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Features */}
        <section className="about-section features-section">
          <div className="features-content">
            <span>KEY FEATURES</span>

            <h2>Everything in One Dashboard</h2>

            <p>
              CardioPredict brings prediction, analytics, and visualization
              together in one simple interface.
            </p>
          </div>

          <div className="features-list">
            {features.map((feature, index) => (
              <div className="feature-item" key={feature}>
                <div className="feature-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section className="workflow-section">
          <div className="section-heading-about">
            <span>HOW IT WORKS</span>
            <h2>From Health Data to Prediction</h2>
          </div>

          <div className="workflow-grid">
            <div className="workflow-step">
              <div className="step-number">01</div>
              <h3>Enter Data</h3>
              <p>
                Patient health parameters are entered through the prediction
                form.
              </p>
            </div>

            <div className="workflow-step">
              <div className="step-number">02</div>
              <h3>Process</h3>
              <p>
                The backend preprocesses the input and applies the trained
                machine learning model.
              </p>
            </div>

            <div className="workflow-step">
              <div className="step-number">03</div>
              <h3>Predict</h3>
              <p>
                The model generates a prediction and probability-based risk
                result.
              </p>
            </div>

            <div className="workflow-step">
              <div className="step-number">04</div>
              <h3>Analyze</h3>
              <p>
                Dashboard visualizations help users understand the dataset and
                model insights.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="about-disclaimer">
          <ShieldCheck size={24} />

          <div>
            <h3>Important Information</h3>

            <p>
              CardioPredict is an educational and analytical application. Its
              predictions are generated by machine learning models and should
              not be considered a medical diagnosis or a substitute for
              professional medical advice.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default About;