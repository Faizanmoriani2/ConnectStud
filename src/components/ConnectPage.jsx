import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserPage from './UserPage';
import "../styles/ConnectPage.css";

export const ConnectPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const sendConnectionRequest = async (receiverId) => {
        const token = localStorage.getItem('accessToken');
        
        try {
            const response = await fetch('http://localhost:5000/api/connections/connect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ receiverId }),
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

    const startChat = async (receiverId) => {
        const token = localStorage.getItem('accessToken');
        
        try {
            // Create or fetch the chat
            const chatResponse = await fetch('http://localhost:5000/api/chats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userId1: localStorage.getItem('userId'), userId2: receiverId }),
            });

            const chatData = await chatResponse.json();
            if (chatResponse.ok) {
                // Redirect to ChatPage with the chat ID
                navigate(`/user/${localStorage.getItem('userId')}/chat?chatId=${chatData._id}`);
            } else {
                setError('Failed to create or fetch chat');
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
                        <button onClick={() => startChat(user._id)}>Message</button> {/* Update this line */}
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};
