import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const MessagePage = () => {
    const { userId } = useParams(); // This is the receiver's ID
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`http://localhost:5000/api/messages/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setMessages(data);
                } else {
                    setError(data.message || 'Failed to fetch messages');
                }
            } catch (err) {
                setError('An error occurred. Please try again.');
            }
        };

        fetchMessages();
    }, [userId]); // Adding userId as a dependency to refetch when it changes

    const sendMessage = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await fetch('http://localhost:5000/api/messages/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ receiverId: userId, message }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessages([...messages, data]);
                setMessage('');
            } else {
                setError(data.message || 'Failed to send message');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Messages</h2>
            {error && <p>{error}</p>}
            <div>
                {messages.map(msg => (
                    <div key={msg._id}>
                        <strong>{msg.sender.username}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};
