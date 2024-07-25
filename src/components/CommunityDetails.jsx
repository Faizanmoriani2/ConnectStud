import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserPage from './UserPage';

const CommunityDetails = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunity = async () => {
      const token = localStorage.getItem('accessToken');

      try {
        const response = await fetch(`http://localhost:5000/api/communities/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setCommunity(data);
          setName(data.name);
          setDescription(data.description);
        } else {
          setError(data.message || 'Failed to fetch community');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchCommunity();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`http://localhost:5000/api/communities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Community updated successfully!');
        setCommunity(data.community);
      } else {
        setError(data.message || 'Failed to update community');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`http://localhost:5000/api/communities/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/communities');
      } else {
        setError(data.message || 'Failed to delete community');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };


  return (
    <>
    <UserPage />
    <div>
      <h2>Community Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {community && (
        <div>
          <form onSubmit={handleUpdate}>
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
            <button type="submit">Update</button>
          </form>
          <button onClick={handleDelete}>Delete Community</button>
        </div>
      )}
    </div>
    </>
  );
};

export default CommunityDetails;
