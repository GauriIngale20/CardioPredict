import { HeartPulse, LayoutDashboard, Activity, Info } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="brand-icon">
          <HeartPulse size={25} />
        </div>

        <div>
          <h2>CardioPredict</h2>
          <span>Heart Health Analytics</span>
        </div>
      </Link>

      <div className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/prediction">
          <Activity size={17} />
          Prediction
        </NavLink>
        <NavLink to="/dashboard">
          <LayoutDashboard size={17} />
          Dashboard
        </NavLink>
        <NavLink to="/about">
          <Info size={17} />
          About
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;