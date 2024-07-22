import { useNavigate, useLocation } from "react-router-dom"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "../styles/Navbar.css"

function Navbar(){
    const navigate = useNavigate();
    const location = useLocation();
    const btnText = "Login"
    const handleClick = (e) => {
        e.preventDefault();
        if(location.pathname === '/register'){
            navigate('/login')
        }
        else{
            navigate('/register')
        }
        
    }

    return(
        <div className="navbar">
            <div className="nav-right">
                <img src="" alt="logo" />
            </div>

            <ul>
                <li><Link to="/">Home</Link></li>
                <li>About</li>
            </ul>
            {location.pathname === '/login' ? (
          <button onClick={handleClick}>Register</button>
        ) : location.pathname === '/register' ? (
            <button onClick={handleClick}>Login</button>
        ) : (
          <>
            <button onClick={handleClick}>Register</button>
          </>
        )}

        </div>
    )
}

export default Navbar