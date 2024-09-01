import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../styles/ChatPage.css';
import UserPage from './UserPage';

const socket = io('http://localhost:5000'); // Replace with your backend URL

export const ChatPage = () => {
    const { userId } = useParams(); // Get userId from the URL params
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchChats = async () => {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`http://localhost:5000/api/chats/${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched chats:', data); // Verify fetched data
                    setChats(data);
                } else {
                    console.error("Failed to fetch chats");
                }
            } catch (err) {
                console.error("Error fetching chats:", err);
            }
        };

        if (userId) {
            fetchChats();
        }
    }, [userId]);

    useEffect(() => {
        if (activeChat) {
            const fetchMessages = async () => {
                const token = localStorage.getItem('accessToken');
                try {
                    const response = await fetch(`http://localhost:5000/api/messages/${activeChat._id}`, {
                        headers: { 'Authorization': `Bearer ${token}` },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setMessages(data);
                    } else {
                        console.error("Failed to fetch messages");
                    }
                } catch (err) {
                    console.error("Error fetching messages:", err);
                }
            };

            fetchMessages();

            // Join the active chat room
            socket.emit('joinChat', activeChat._id);

            // Listen for incoming messages
            socket.on('receiveMessage', (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        }

        return () => {
            if (activeChat) {
                socket.emit('leaveChat', activeChat._id); // Optionally leave the chat room
                socket.off('receiveMessage'); // Remove the event listener
            }
        };
    }, [activeChat]);

    const sendMessage = () => {
        if (newMessage.trim() === '' || !userId || !activeChat) return;

        const messageData = {
            chatId: activeChat._id,
            senderId: userId,
            message: newMessage,
        };

        // Emit the message to the server
        socket.emit('sendMessage', messageData);

        // Optimistically update the UI with the sent message
        setMessages((prevMessages) => [...prevMessages, { ...messageData, _id: Date.now() }]);
        setNewMessage('');
    };

    return (
        <>
        <UserPage />
        <div className="chat-page">
            <div className="chat-list">
                {chats.length > 0 ? (
                    chats.map((chat) => (
                        <div
                            key={chat._id}
                            className={`chat-item ${activeChat && chat._id === activeChat._id ? 'active' : ''}`}
                            onClick={() => setActiveChat(chat)}
                        >
                            {chat.members.map((participant) => participant.username).join(', ')}
                        </div>
                    ))
                ) : (
                    <p>No chats available. Start a new conversation!</p>
                )}
            </div>
            <div className="chat-window">
                {activeChat ? (
                    <>
                        <div className="messages">
                            {messages.length > 0 ? (
                                messages.map((msg) => (
                                    <div
                                        key={msg?._id || Date.now()} // Ensure msg is defined
                                        className={`message ${msg?.sender?._id === userId ? 'sent' : 'received'}`}
                                    >
                                        {msg?.message || 'Message content missing'}
                                    </div>
                                ))
                            ) : (
                                <p>No messages yet. Say something!</p>
                            )}
                        </div>
                        <div className="message-input">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </>
                ) : (
                    <p>Select a chat to start messaging</p>
                )}
            </div>
        </div>
        </>
    );
};
