import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ViewEvents.css';
import UserPage from './UserPage';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const navigate = useNavigate();

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

  const handleDelete = async (eventId) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setEvents(events.filter(event => event._id !== eventId));
        alert('Event deleted successfully');
      } else {
        alert('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const isEventPassed = (date) => {
    const eventDate = new Date(date);
    const currentDate = new Date();
    return eventDate < currentDate;
  };

  const formatDateToGoogle = (date) => {
    return new Date(date).toISOString().replace(/[-:.]/g, '').slice(0, -5) + 'Z';
  };

  const getGoogleCalendarUrl = (event) => {
    const startDate = formatDateToGoogle(event.date);
    const endDate = formatDateToGoogle(new Date(new Date(event.date).getTime() + 60 * 60 * 1000)); // 1 hour later
    const title = encodeURIComponent(event.title);
    const description = encodeURIComponent(event.description || '');
    const location = encodeURIComponent(event.location || '');

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${description}&location=${location}`;
  };

  return (
    <>
      <UserPage />
      <div className="view-events-container">
        <h2 className="view-events-title">Events</h2>
        <ul className="events-list">
          {events.map((event) => (
            <li key={event._id} className="event-item">
              <Link to={`/events/${event._id}`} className="event-link">
                {event.title}
              </Link>
              <p className="event-date">
                {isEventPassed(event.date) ? 'Event has passed' : new Date(event.date).toLocaleString()}
              </p>
              {event.createdBy === userId && (
                <div className="event-actions">
                  <button
                    onClick={() => navigate(`/events/${event._id}/update`)}
                    className="update-button"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              )}
              <a
                href={getGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="google-calendar-button"
              >
                Add to Google Calendar
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ViewEvents;
