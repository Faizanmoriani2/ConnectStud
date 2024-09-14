import { useNavigate, useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import connectLogo2 from "../assets/connectstud2.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const btnText = "Login";
  
  const handleClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/register") {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  // Function to determine if a link is active
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="navbar">
      <div className="nav-right">
        <img src={connectLogo2} alt="logo" width={100} />
      </div>

      <ul>
        <li className={isActive("/")}>
          <Link to="/">Home</Link>
        </li>
        <li className={isActive("/about")}>
          <Link to="/about">About</Link>
        </li>
      </ul>

      {location.pathname === "/login" ? (
        <button onClick={handleClick}>
          Register
          <FontAwesomeIcon icon={faArrowRight} className="my-arrow" />
        </button>
      ) : location.pathname === "/register" ? (
        <button onClick={handleClick}>
          Login
          <FontAwesomeIcon icon={faArrowRight} className="my-arrow" />
        </button>
      ) : (
        <button onClick={handleClick}>
          Register
          <FontAwesomeIcon icon={faArrowRight} className="my-arrow" />
        </button>
      )}
    </div>
  );
}

export default Navbar;
