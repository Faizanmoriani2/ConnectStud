import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUsers, faUserPlus, faComments, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import '../styles/UserPage.css';
import bell from "../assets/bell.png";
import logo from "../assets/logo-white-nobg.png";
import Newlogo from "../assets/connectstud2.png";



const UserPage = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current location

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/users/current', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          localStorage.removeItem('accessToken');
          navigate('/login');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        localStorage.removeItem('accessToken');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Check if the current route matches the path
  const isActive = (path) => location.pathname === path;

  if (!user) return <p>Loading...</p>;

  return (
    <div className='user-navbar'>
      <div className="user-nav-left">
        <img src={Newlogo} alt="logo" width={80}/>
      </div>
      
      <div className="user-nav-mid">
        <ul>
          <li className={isActive('/communities') ? 'active' : ''}>
            <Link to={'/communities'}>
              <FontAwesomeIcon icon={faUsers} className="nav-icon" />
              <span className="link-text"></span>
            </Link>
          </li>
          <li className={isActive(`/user/${user.id}/chat`) ? 'active' : ''}>
            <Link to={`/user/${user.id}/chat`}>
              <FontAwesomeIcon icon={faComments} className="nav-icon" />
              <span className="link-text"></span>
            </Link>
          </li>
          <li className={isActive('/newsfeed') ? 'active' : ''}>
            <Link to={`/newsfeed`}>
              <FontAwesomeIcon icon={faNewspaper} className="nav-icon" />
              <span className="link-text"></span>
            </Link>
          </li>
          <li className={isActive('/connect') ? 'active' : ''}>
            <Link to={'/connect'}>
              <FontAwesomeIcon icon={faUserPlus} className="nav-icon" />
              <span className="link-text"></span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="user-info" onClick={toggleDropdown}>   
        <div className="profile-pic">
          <img src={user.profilePicture 
                      ? `http://localhost:5000${user.profilePicture}` 
                      : 'http://localhost:5000/uploads/default-avatar.png'} 
                      alt="Profile" />
        </div>
        <p>{user.username}</p>
        <FontAwesomeIcon icon={faCaretDown} className="dropdown-arrow" />
      </div>

      {dropdownVisible && (
        <div className="dropdown-menu">
          <Link to={`/user/${user.id}/profile`} className="dropdown-item">View Profile</Link>
          <Link to={'/notifications'} className="dropdown-item">
             Notifications
          </Link>
          <button onClick={handleLogout} className="dropdown-item">Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserPage;
