
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCommunities = async () => {
      const token = localStorage.getItem('accessToken');

      try {
        const response = await fetch('http://localhost:5000/api/communities', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setCommunities(data);
        } else {
          setError(data.message || 'Failed to fetch communities');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchCommunities();
  }, []);

  return (
    <div>
      <h2>Communities</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {communities.map((community) => (
          <li key={community._id}>
            <Link to={`/communities/${community._id}`}>{community.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityList;
