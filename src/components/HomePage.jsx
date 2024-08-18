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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Doloremque pariatur repellat nostrum consequatur dolor
                blanditiis corporis quo fugiat assumenda aliquam explicabo ab,
                facere eum, similique quia in quae? Perspiciatis, pariatur.
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
