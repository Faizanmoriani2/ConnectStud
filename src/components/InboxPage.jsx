import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const InboxPage = () => {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      const token = localStorage.getItem('accessToken');

      try {
        const response = await fetch('http://localhost:5000/api/messages/conversations', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setConversations(data);
        } else {
          setError(data.message || 'Failed to fetch conversations');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchConversations();
  }, []);

  return (
    <div>
      <h2>Inbox</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {conversations.map((conv) => (
          <li key={conv._id}>
            <Link to={`/messages/${conv.receiver._id}`}>
              {conv.receiver.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
