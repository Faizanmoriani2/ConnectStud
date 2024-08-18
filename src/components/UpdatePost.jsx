import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePost = () => {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setContent(data.content);
          setImage(data.image);
        } else {
          setError(data.message || 'Failed to fetch post');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Post updated successfully!');
        setTimeout(() => navigate(`/communities/${data.community._id}`), 2000); // Navigate back to the community page after success
      } else {
        setError(data.message || 'Failed to update post');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <h2>Edit Post</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Update Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {image && (
          <div>
            <p>Current Image:</p>
            <img src={`http://localhost:5000${image}`} alt="Current Post" style={{ maxWidth: '200px' }} />
          </div>
        )}
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePost;