import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/UserPage.css'

const UserPage = () => {
  const [user, setUser] = useState(null);
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

  if (!user) return <p>Loading...</p>;

  return (
    <div className='user-navbar'>

      <div className="user-nav-left">
        <img src="" alt="logo" />
        <h2>ConnectStud</h2>
      </div>

      <div className="user-nav-mid">
        <ul>
          <li><Link to={'/communities'}>Communities</Link></li>
        </ul>
      </div>

      <div className="user-info">
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
      <div className="profile-pic">
        <img src="" alt="" />
      </div>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserPage;
