import React from "react";

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Heart Disease Prediction</h1>

        <p>
          Analyze cardiovascular health data and predict
          heart disease risk using machine learning.
        </p>

        <button
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          Explore Dashboard
        </button>
      </div>
    </section>
  );
}

export default HeroSection;