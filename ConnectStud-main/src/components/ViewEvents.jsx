import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <Link to={`/events/${event._id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewEvents;
