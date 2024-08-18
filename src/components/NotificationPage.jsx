import React, { useEffect, useState } from 'react';
import UserPage from './UserPage';
import "../styles/NotificationPage.css"

export const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('accessToken');

      try {
        const response = await fetch('http://localhost:5000/api/connections/requests', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setNotifications(data);
        } else {
          setError(data.message || 'Failed to fetch notifications');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchNotifications();
  }, []);

  const handleConfirm = async (requestId) => {
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch('http://localhost:5000/api/connections/requests/confirm', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId, status: 'accepted' }),
      });

      const data = await response.json();
      if (response.ok) {
        // Update the notifications state to reflect the change
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === requestId ? { ...notification, status: 'accepted' } : notification
          )
        );
      } else {
        setError(data.message || 'Failed to confirm connection request');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleDecline = async (requestId) => {
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch('http://localhost:5000/api/connections/requests/confirm', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId, status: 'declined' }),
      });

      const data = await response.json();
      if (response.ok) {
        // Update the notifications state to reflect the change
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === requestId ? { ...notification, status: 'declined' } : notification
          )
        );
      } else {
        setError(data.message || 'Failed to decline connection request');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <UserPage />
      <div className="notification-container">
        <h2 className="notification-title">Notifications</h2>
        {error ? (
          <p className="notification-error">{error}</p>
        ) : (
          <>
            {notifications.length === 0 ? (
              <p className="notification-none">No notifications available</p>
            ) : (
              <ul className="notification-list">
                {notifications.map((notification) => (
                  <li key={notification._id} className="notification-item">
                    Connection request from <strong>{notification.sender.username}</strong> ({notification.sender.email}) - Status: <strong>{notification.status}</strong>
                    {notification.status === 'pending' && (
                      <div className="notification-actions">
                        <button className="confirm-btn" onClick={() => handleConfirm(notification._id)}>Confirm</button>
                        <button className="decline-btn" onClick={() => handleDecline(notification._id)}>Decline</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
};
