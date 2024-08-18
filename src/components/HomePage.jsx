import "../styles/HomePage.css";
import homeImage from "../assets/HomePage.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function HomePage() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="home-main">
          <div className="home">
            <div className="home-btnConnect">
              <h3>#Connect</h3>
            </div>
            <div className="home-tagline">
              <h2>
                Unite, Connect, and, Innovate: Your Gateway to Thriving
                Communities
              </h2>
              <p>
              Our mission is to empower individuals to find meaningful connections, share knowledge, and grow together. By fostering supportive environments, we help communities thrive and inspire creativity through shared experiences and resources. Join us in shaping the future of connected communities.
              </p>
            </div>
            <div className="home-btnStart">
              <button onClick={handleClick}>
                Start Free Today <FontAwesomeIcon icon={faArrowRight} className="my-arrow_1" />
              </button>
            </div>
          </div>
          <div className="homeImage">
            <img src={homeImage} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
