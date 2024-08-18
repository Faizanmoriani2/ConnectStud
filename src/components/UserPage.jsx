import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import '../styles/UserPage.css';
import bell from "../assets/bell.png";
import logo from "../assets/logo-white-nobg.png"

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

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

  if (!user) return <p>Loading...</p>;

  return (
    <div className='user-navbar'>

      <div className="user-nav-left">
        <img src={logo} alt="logo" width={80}/>
      </div>
      
      <div className="user-nav-mid">
        <ul>
          <li><Link to={'/communities'}>Explore Communities</Link></li>
        </ul>
      </div>

      <div className="user-info" onClick={toggleDropdown}>   
        <div className="profile-pic">
          <img src={`http://localhost:5000/uploads/default-avatar.png`} alt="" />
        </div>
        <p>{user.username}</p>
        <FontAwesomeIcon icon={faCaretDown} className="dropdown-arrow" />
      </div>

      {dropdownVisible && (
        <div className="dropdown-menu">
          <Link to={`/user/${user.id}/profile`} className="dropdown-item">View Profile</Link>
          <Link to={'/notifications'} className="dropdown-item">
            <img src={bell} alt="Notifications" width={20} /> Notifications
          </Link>
          <button onClick={handleLogout} className="dropdown-item">Logout</button>
        </div>
      )}

    </div>
  );
};

export default UserPage;
