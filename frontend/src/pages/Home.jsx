import {
  ArrowRight,
  Brain,
  HeartPulse,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <HeartPulse size={17} />
              AI-Powered Heart Health Analysis
            </div>

            <h1>
              Understand Your
              <span> Heart Health</span>
              <br />
              With Intelligent Prediction
            </h1>

            <p>
              Analyze health parameters using machine learning and get an
              easy-to-understand heart disease risk prediction.
            </p>

            <div className="hero-buttons">
              <Link to="/prediction" className="primary-button">
                Start Prediction
                <ArrowRight size={19} />
              </Link>

              <Link to="/dashboard" className="secondary-button">
                Explore Dashboard
              </Link>
            </div>

            <div className="trust-row">
              <div>
                <ShieldCheck size={19} />
                <span>Secure Analysis</span>
              </div>

              <div>
                <Brain size={19} />
                <span>ML Powered</span>
              </div>

              <div>
                <BarChart3 size={19} />
                <span>Data Insights</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="heart-card">
              <div className="pulse-ring">
                <HeartPulse size={80} strokeWidth={1.5} />
              </div>

              <div className="pulse-line">
                <span></span>
              </div>

              <h3>Heart Health</h3>
              <p>Data-driven insights for better awareness</p>

              <div className="health-status">
                <span className="status-dot"></span>
                Analysis Ready
              </div>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <strong>1,025</strong>
            <span>Patient Records</span>
          </div>

          <div className="stat-card">
            <strong>13</strong>
            <span>Health Features</span>
          </div>

          <div className="stat-card">
            <strong>2</strong>
            <span>ML Models</span>
          </div>

          <div className="stat-card">
            <strong>0</strong>
            <span>Missing Values</span>
          </div>
        </section>

        <section className="info-section">
          <div>
            <span className="section-label">HOW IT WORKS</span>
            <h2>Simple. Intelligent. Data Driven.</h2>
          </div>

          <p>
            Enter health information, let the machine learning model analyze
            the data, and view the generated prediction and risk category.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Home;