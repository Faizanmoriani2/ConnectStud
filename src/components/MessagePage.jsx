import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

export const MessagePage = () => {
    const { userId } = useParams(); // The ID of the user you're chatting with
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null); // Socket instance
    const currentUserId = 'yourCurrentUserId'; // Replace this with the actual logged-in user's ID

    // Initialize socket connection and setup listeners
    useEffect(() => {
        const newSocket = io('http://localhost:5000'); // Replace with your backend URL
        setSocket(newSocket);

        // Join the room with the user ID
        newSocket.emit('joinRoom', userId);

        // Listen for incoming messages
        newSocket.on('chatMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // Cleanup on unmount
        return () => {
            newSocket.disconnect();
        };
    }, [userId]);

    // Fetch previous messages when the component loads
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/messages/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Assuming you're using token-based auth
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMessages(data);
                } else {
                    console.error('Failed to fetch messages');
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [userId]);

    useEffect(() => {
        const newSocket = io('http://localhost:5000'); // Replace with your backend URL
        setSocket(newSocket);
    
        newSocket.emit('joinRoom', userId);
    
        // Listen for incoming messages
        newSocket.on('chatMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });
    
        return () => {
            newSocket.disconnect();
        };
    }, [userId]);

    // Send a message
    const sendMessage = () => {
        if (message.trim() !== '' && socket) {
            socket.emit('chatMessage', { receiverId: userId, senderId: currentUserId, message });
            setMessages((prevMessages) => [...prevMessages, { senderId: currentUserId, message }]);
            setMessage(''); // Clear input field
        }
    };
    

    return (
        <div>
            <h2>Messages</h2>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.senderId === currentUserId ? 'You' : 'Other'}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()} // Send message on Enter key press
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

