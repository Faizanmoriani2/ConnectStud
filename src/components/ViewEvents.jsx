import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ViewEvents.css';
import UserPage from './UserPage';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
    <UserPage />
    <div className="view-events-container">
      <h2 className="view-events-title">Events</h2>
      <ul className="events-list">
        {events.map((event) => (
          <li key={event._id} className="event-item">
            <Link to={`/events/${event._id}`} className="event-link">{event.title}</Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default ViewEvents;
