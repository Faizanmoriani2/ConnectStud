import React, { useState } from 'react';
import axios from 'axios';
import "../styles/Registration.css"
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      console.log(response.data);
      navigate('/login')
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <>
    <Navbar />
    <div className="register-container">
      <div className='register-form'>
        <h2>Create an Account</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>

    </>
  );
};

export default Registration;
