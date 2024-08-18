import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserPage from './UserPage';
import "../styles/ConnectPage.css"

export const ConnectPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('accessToken');
      
            try {
              const response = await fetch('http://localhost:5000/api/connections/users', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });
      
              const data = await response.json();
              if (response.ok) {
                setUsers(data);
              } else {
                setError(data.message || 'Failed to fetch users');
              }
            } catch (err) {
              setError('An error occurred. Please try again.');
            }
        };
        fetchUsers();
    }, []);
    
    const sendConnectionRequest = async (userId) => {
        const token = localStorage.getItem('accessToken');
        
        try {
            const response = await fetch('http://localhost:5000/api/connections/connect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ receiverId: userId }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Connection request sent');
            } else {
                setError(data.message || 'Failed to send connection request');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <>
        <UserPage />
        <div className="ConnectPage">
            <h1>Connect with Users</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.username} ({user.email})
                        <button onClick={() => sendConnectionRequest(user._id)}>Connect</button>
                        <Link to={`/messages/${user._id}`}>
                            <button>Message</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};
