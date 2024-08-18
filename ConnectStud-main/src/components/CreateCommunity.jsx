import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserPage from './UserPage';
import "../styles/CreateCommunity.css"

const CreateCommunity = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      console.log([...formData]); // Log the FormData entries
      const response = await fetch('http://localhost:5000/api/communities/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Community created successfully!');
        navigate('/communities');
      } else {
        setError(data.message || 'Failed to create community');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
    <UserPage />
    <div className="create-community-container">
    
    <div className='create-community-form'>
      <h2>Create Community</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
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
        <div>
          <label>Cover Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
      
    </div>
    </>
  );
};

export default CreateCommunity;
