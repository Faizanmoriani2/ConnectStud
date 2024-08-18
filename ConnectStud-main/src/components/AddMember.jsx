import React, { useState } from 'react';

const AddMember = ({ communityId }) => {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddMember = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch('http://localhost:5000/api/communities/addMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ communityId, userId }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Member added successfully!');
        setUserId('');
      } else {
        setError(data.message || 'Failed to add member');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h3>Add Member</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleAddMember}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddMember;
