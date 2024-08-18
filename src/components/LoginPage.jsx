import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import "../styles/LoginPage.css"
import formWallpaper from "../assets/home_wallpaper.jpeg"

import CustomIcon from './CustomIcon'; // Make sure the path is correct

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userId', data.user.id);
      navigate('/user');
    } else {
      alert(data.message || 'Login failed');
    }
  };

  return (
    <> 
    <Navbar />
    <div className="register-container">
        <div className="register-form">
          <h1> <CustomIcon />ConnectStud</h1>
          <h2>Log In</h2>
          <p>Let's get started!</p>
          <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="resgister-wallpaper">
          <img src={formWallpaper} alt="form-wallpaper" />
        </div>
    </div>
    </>
  );
};

export default LoginPage;
