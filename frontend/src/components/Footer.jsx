import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Heart Disease Prediction System
      </p>

      <p>
        Machine Learning Healthcare Dashboard
      </p>
    </footer>
  );
}

export default Footer;