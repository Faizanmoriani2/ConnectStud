import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CreateCommunity = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
  
    const handleCreate = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('accessToken');
    //   const createdBy = '669d2f6f53564b241a8e7f82';
  
      try {
        const response = await fetch('http://localhost:5000/api/communities/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ name, description }),
        });
  
        const data = await response.json();
        if (response.ok) {
          setSuccess('Community created successfully!');
          setName('');
          setDescription('');
        } else {
          setError(data.message || 'Failed to create community');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };
  
    return (
      <div>
        <h2>Create Community</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <form onSubmit={handleCreate}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    );
  };
  
  export default CreateCommunity;
