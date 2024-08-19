import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/EventDetails.css';
import UserPage from './UserPage';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <p className="loading-message">Loading...</p>;
  }

  // Format the date to a more readable format
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <UserPage />
      <div className="event-details-container">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-description">Description: {event.description}</p>
        <p className="event-date">Date: {formattedDate}</p>
        <p className="event-location">Location: {event.location}</p>
      </div>
    </>
  );
};

export default EventDetails;
