import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import UserPage from './UserPage';
import "../styles/CreatePost.css"

const CreatePost = () => {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // Added image state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    const formData = new FormData(); // Using FormData to handle image upload
    formData.append('content', content);
    formData.append('community', id);
    if (image) {
      formData.append('image', image); // Add the image to the form data
    }

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData, // Use formData as the body
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Post created successfully!');
        setContent(''); // Clear the form
        setImage(null); // Clear the image
      } else {
        setError(data.message || 'Failed to create post');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <UserPage />
      <div className="create-post-container">
        <h2 className="create-post-title">Create Post in Community {id}</h2>
        {error && <p className="create-post-error">{error}</p>}
        {success && <p className="create-post-success">{success}</p>}
        <form className="create-post-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <input
              type="text"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button className="create-post-button" type="submit">Create</button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
