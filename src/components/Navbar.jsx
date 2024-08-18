import { useNavigate, useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../styles/Navbar.css";
import Logo from "../assets/logo.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <div className="navbar">
      <div className="nav-right">
        <img src={Logo} alt="logo" width={50} />
        <h2>ConnectStud</h2>
      </div>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>About</li>
      </ul>
      {location.pathname === "/login" ? (
        <button onClick={handleClick}>Register<FontAwesomeIcon icon={faArrowRight} className="my-arrow" /></button>
      ) : location.pathname === "/register" ? (
        <button onClick={handleClick}>Login<FontAwesomeIcon icon={faArrowRight} className="my-arrow" /></button>
      ) : (
        <>
          <button onClick={handleClick}>Register<FontAwesomeIcon icon={faArrowRight} className="my-arrow" /></button>
        </>
      )}
    </div>
  );
}

export default Navbar;
