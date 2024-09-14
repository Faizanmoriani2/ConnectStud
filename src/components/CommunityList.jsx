
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserPage from './UserPage';
import '../styles/CommunityList.css'
import communityImage from "../assets/HomePage.jpg"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


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
    <>
    <UserPage />
    <div className='communities'>
      <h2>Communities</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="community-card-wrap">
        {communities.map((community) => (
          
          <div key={community._id} className="community-card">
              <div className='community-image'>
                <img src={`http://localhost:5000${community.coverImage}`} alt="img.jpg" />
              </div>
              <div className='community-content'>
                <div className="community-title gradient-text">
                <Link to={`/communities/${community._id}`}>{community.name}</Link>
                </div>
                <div className="community-description">
                <p>{community.description}</p>
                <h4><FontAwesomeIcon icon={faUser} size="1x" /> {community.createdBy.username}</h4>
                </div>
              </div>
          </div>
        ))}
        <div className="community-card">
          <div className='community-image'>
              </div>
              <div className='community-content'>
                <div className="community-title gradient-text">
                  <Link to={'/communities/create'}>Create New Community</Link>
                </div>
                <div className="community-description">
                <h4> </h4>
                </div>
              </div>
      </div>
      </div>
   
    </div>
    </>
  );
};

export default CommunityList;
