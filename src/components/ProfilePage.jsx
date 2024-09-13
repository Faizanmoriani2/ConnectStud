import React, { useState, useEffect } from 'react';
import UserPage from './UserPage';
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('/uploads/default-avatar.png');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState('');

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
        setBio(data.bio || ''); // Set bio if available, otherwise keep it empty
        setProfilePicture(data.profilePicture || '/uploads/default-avatar.png'); // Set profile picture or default
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('bio', bio);
    if (profilePicture instanceof File) { // Only append if profilePicture is a new file
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
      setUser(data);
      setProfilePicture(data.profilePicture); // Update profile picture after successful update
      setSuccess('Profile updated successfully!');
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

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
      <div className="cont">
        <div className="profile-container">
          <h2>{user.username}'s Profile</h2>
          {!editMode ? (
            <div className="profile-info">
              <img 
                src={`http://localhost:5000${profilePicture}`} 
                alt="Profile" 
                className="profile-image" 
              />
              <p><strong>Name:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {bio && <p><strong>Bio:</strong> {bio}</p>}
              <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
            </div>
          ) : (
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="bio">Bio:</label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bio-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="profilePicture">Profile Picture:</label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
              </div>
              <div className="button-group">
                <button type="submit" className="update-btn">Update Profile</button>
                <button type="button" className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            </form>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
