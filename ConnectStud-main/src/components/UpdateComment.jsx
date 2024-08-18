import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateComment = () => {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/comments/${id}`);
        const data = await response.json();
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching comment:', error);
      }
    };

    fetchComment();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Comment updated successfully!');
      } else {
        setError(data.message || 'Failed to update comment');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Update Comment</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Content:</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateComment;
