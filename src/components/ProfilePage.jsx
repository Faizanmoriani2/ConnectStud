import React, { useState, useEffect } from 'react';
import UserPage from './UserPage';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/current`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
        setBio(data.bio || '');
        setProfilePicture(data.profilePicture || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle form submission for updating profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Clear previous error
    setSuccess(''); // Clear previous success message

    const formData = new FormData();
    formData.append('bio', bio);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setUser(data);  // Update user data after a successful update
      setSuccess('Profile updated successfully!');
      setEditMode(false);  // Exit edit mode after successful update
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle file change
  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <>
    <UserPage />
    <div>
      <h2>{user.username}'s Profile</h2>
      {!editMode ? (
        <div>
           <img src={`http://localhost:5000/uploads/default-avatar.png`} alt="Profile" width="150" />

          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit">Update Profile</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
    </>
  );
};

export default ProfilePage;
