import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserPage from './UserPage';
import '../styles/CommunityEdit.css';

const CommunityEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCommunity = async () => {
      const response = await fetch(`http://localhost:5000/api/communities/${id}`);
      const data = await response.json();
      setName(data.name);
      setDescription(data.description);
    };

    fetchCommunity();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    const formData = new FormData();
    if (name) formData.append('name', name);
    if (description) formData.append('description', description);
    if (coverImage) formData.append('coverImage', coverImage);

    try {
      const response = await fetch(`http://localhost:5000/api/communities/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate(`/communities/${id}`);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update community');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  return (
    <>
      <UserPage />
      <div className="community-edit-container">
        <h2>Edit Community</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="community-edit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              className="input-field"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="coverImage">Cover Image:</label>
            <input
              type="file"
              id="coverImage"
              className="input-field"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="community-edit-button">Update</button>
        </form>
      </div>
    </>
  );
};

export default CommunityEdit;
