import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/ChatPage.css';
import UserPage from './UserPage';

const socket = io('http://localhost:5000'); // Replace with your backend URL

export const ChatPage = () => {
    const { userId } = useParams(); // Get userId from the URL params
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isChatFullscreen, setIsChatFullscreen] = useState(false); // Toggle fullscreen

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

    const deleteChat = async (chatId) => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`http://localhost:5000/api/chats/${chatId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.ok) {
                setChats(chats.filter(chat => chat._id !== chatId));
                if (activeChat?._id === chatId) setActiveChat(null);
            } else {
                console.error("Failed to delete chat");
            }
        } catch (err) {
            console.error("Error deleting chat:", err);
        }
    };

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
                setMessages((prevMessages) => {
                    // Check if this message is already in the state by comparing temporary IDs
                    const isMessageAlreadyAdded = prevMessages.some(
                        (msg) => msg._id === message._id || msg.tempId === message._id
                    );

                    // If the message is already added, do not add it again
                    if (isMessageAlreadyAdded) {
                        return prevMessages;
                    }

                    return [...prevMessages, message];
                });
            });
        }

        return () => {
            if (activeChat) {
                socket.emit('leaveChat', activeChat._id); // Optionally leave the chat room
                socket.off('receiveMessage'); // Remove the event listener
            }
        };
    }, [activeChat, userId]);

    const sendMessage = () => {
        if (newMessage.trim() === '' || !userId || !activeChat) return;

        const messageData = {
            chatId: activeChat._id,
            senderId: userId,
            message: newMessage,
            tempId: Date.now(), // Temporary ID to track the message
        };

        // Emit the message to the server
        socket.emit('sendMessage', messageData);

        // Optimistically update the UI with the sent message
        setMessages((prevMessages) => [
            ...prevMessages,
            { 
                ...messageData, 
                _id: messageData.tempId, 
                sender: { _id: userId }
            }
        ]);

        setNewMessage('');
    };

    const handleChatClick = (chat) => {
        setActiveChat(chat);
        setIsChatFullscreen(true); // Set chat window to fullscreen
    };

    const handleCloseChat = () => {
        setIsChatFullscreen(false); // Close fullscreen
        setActiveChat(null);
    };

    return (
        <>
        <UserPage />
        <div className="chat-page">
            <div className={`chat-list ${isChatFullscreen ? 'hidden' : ''}`}>
                {chats.length > 0 ? (
                    chats.map((chat) => {
                        const otherParticipant = chat.members.find(member => member._id !== userId);
                        return (
                            <div
                                key={chat._id}
                                className={`chat-item ${activeChat && chat._id === activeChat._id ? 'active' : ''}`}
                                onClick={() => handleChatClick(chat)}
                            >
                                {otherParticipant?.username}
                                <FontAwesomeIcon 
                                    icon={faTrash} 
                                    className="delete-icon" 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent click from selecting the chat
                                        deleteChat(chat._id);
                                    }}
                                />
                            </div>
                        );
                    })
                ) : (
                    <p>No chats available. Start a new conversation!</p>
                )}
            </div>
            {activeChat && (
                <div className={`chat-window ${isChatFullscreen ? 'fullscreen' : ''}`}>
                    <button className="close-button" onClick={handleCloseChat}>Close Chat</button> {/* Button to close full-screen chat */}
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
                </div>
            )}
        </div>
        </>
    );
};
