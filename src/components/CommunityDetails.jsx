import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserPage from './UserPage';
import "../styles/CommunityDetails.css";

const CommunityDetails = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const currentUserId = localStorage.getItem('userId');
  const [isMember, setIsMember] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [commentContent, setCommentContent] = useState({}); // Now an object

  useEffect(() => {
    const fetchCommunity = async () => {
      const token = localStorage.getItem('accessToken');

      try {
        const [communityResponse, postsResponse] = await Promise.all([
          fetch(`http://localhost:5000/api/communities/${id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }),
          fetch(`http://localhost:5000/api/posts/community/${id}/posts`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }),
        ]);

        const communityData = await communityResponse.json();
        const postsData = await postsResponse.json();

        if (communityResponse.ok && postsResponse.ok) {
          setCommunity(communityData);
          setPosts(postsData);
          setIsMember(communityData.members.includes(currentUserId));
        } else {
          setError(communityData.message || 'Failed to fetch community');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchCommunity();
  }, [id, currentUserId]);

  const handleJoinUnjoin = async () => {
    const token = localStorage.getItem('accessToken');
    const endpoint = isMember ? 'removeMember' : 'addMember';

    try {
      const response = await fetch(`http://localhost:5000/api/communities/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ communityId: id, userId: currentUserId }),
      });

      if (response.ok) {
        setIsMember(!isMember);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update membership status');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const confirmDelete = () => {
    setShowDeleteConfirmation(true); // Show the confirmation modal
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false); // Hide the confirmation modal
    setPostToDelete(null); // Reset the post to delete
  };

  const proceedDelete = () => {
    if (postToDelete) {
      handleDeletePost(postToDelete); // Proceed with post deletion
    } else {
      handleDeleteCommunity(); // Proceed with community deletion
    }
  };

  const handleDeleteCommunity = async () => {
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`http://localhost:5000/api/communities/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        navigate('/communities'); // Redirect to the communities list page after deletion
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete community');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPosts(posts.filter(post => post._id !== postId));
        cancelDelete(); // Close the confirmation modal after deletion
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete post');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleEditPost = (postId) => {
    navigate(`/posts/${postId}/update`);
  };

  const initiatePostDelete = (postId) => {
    setPostToDelete(postId); // Set the post to delete
    setShowDeleteConfirmation(true); // Show the confirmation modal
  };

  const fetchComments = async (postId) => {
    const token = localStorage.getItem('accessToken');
  
    try {
      const response = await fetch(`http://localhost:5000/api/comments/post/${postId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const commentsData = await response.json();
        setComments(prevComments => ({
          ...prevComments,
          [postId]: commentsData,
        }));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to fetch comments');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };
  const handleAddComment = async (postId) => {
    const token = localStorage.getItem('accessToken');
    const content = commentContent[postId]; // Extract the specific comment content
  
    if (typeof content !== 'string') {
      console.error('Comment content must be a string');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content, post: postId }), // Send the extracted comment content
      });
  
      if (response.ok) {
        setCommentContent(prevContent => ({
          ...prevContent,
          [postId]: '', // Clear the comment input after successful addition
        }));
        fetchComments(postId); // Fetch the updated comments list
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add comment');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleDeleteComment = async (commentId, postId) => {
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchComments(postId); // Fetch the updated comments list after deletion
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete comment');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const toggleComments = (postId) => {
    if (comments[postId]) {
      setComments(prevComments => ({
        ...prevComments,
        [postId]: null,
      }));
    } else {
      fetchComments(postId);
    }
  };

  return (
    <>
      <UserPage />
      <div className='community-detail-container'>
        <h2>Community Details</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {community && (
          <div className='community-detail-main'>
            <img src={`http://localhost:5000${community.coverImage}`} alt="Community Cover" />
            <h3>{community.name}</h3>
            <p>{community.description}</p>

            {community.createdBy === currentUserId ? (
              <div className='community-detail-update-section'>
                <Link to={`/communities/${id}/edit`}>
                  <button>Edit Community</button>
                </Link>
                <button onClick={confirmDelete}>Delete Community</button>
              </div>
            ) : (
              <button onClick={handleJoinUnjoin}>
                {isMember ? 'Unjoin' : 'Join'} Community
              </button>
            )}
          </div>
        )}

        <div className="Community-details-btn">
          {isMember ? (
            <Link to={`/communities/${id}/create-post`}>
              <button>Add Post</button>
            </Link>
          ) : (
            <p>You must be a member to add posts.</p>
          )}
          <Link to={`/communities/${id}/create-event`}>
            <button>Add Event</button>
          </Link>
          <Link to={`/communities/${id}/events`}>
            <button>Upcoming Events</button>
          </Link>
        </div>

        <br />

        <h3>Posts in this Community</h3>
        <div className="community-posts">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="community-post-item">
                <p><strong>{post.author.username}</strong> ({post.author.email})</p>
                  <hr />
                <p>{post.content}</p>
                {post.image && <img src={`http://localhost:5000${post.image}`} alt="Post" />}
                {(post.author._id === currentUserId || community.createdBy === currentUserId) && (
                  <div className="post-actions">
                    <button onClick={() => handleEditPost(post._id)}>Edit</button>
                    <button onClick={() => initiatePostDelete(post._id)}>Delete</button>
                  </div>
                )}

                {/* Comment Section */}
                <div className="comments-section">
                  <button onClick={() => toggleComments(post._id)}>
                    {comments[post._id] ? 'Hide Comments' : 'Show Comments'}
                  </button>
                  {comments[post._id] && (
                    <div className="comments-list">
                      {comments[post._id].map((comment) => (
                        <div key={comment._id} className="comment-item">
                          <p><strong>{comment.author.username}</strong> ({comment.author.email})</p>
                          <p>{comment.content}</p>
                          {(comment.author._id === currentUserId || post.author._id === currentUserId) && (
                            <button onClick={() => handleDeleteComment(comment._id, post._id)}>Delete</button>
                          )}
                        </div>
                      ))}
                    </div>

                  )}
                </div>

                {/* Comment Input */}
                <textarea
                  value={commentContent[post._id] || ''}
                  onChange={(e) => setCommentContent(prevContent => ({
                    ...prevContent,
                    [post._id]: e.target.value,
                  }))}
                  placeholder="Add a comment..."
                  rows="3" // Adjust rows to control the height
                  cols="50" // Adjust columns to control the width
                />
                <button onClick={() => handleAddComment(post._id)}>Add Comment</button>
              </div>
            ))
          ) : (
            <p>No posts in this community yet.</p>
          )}
        </div>

        {showDeleteConfirmation && (
          <div className="modal">
            <div className="modal-content">
              <p>Are you sure you want to delete this {postToDelete ? 'post' : 'community'}?</p>
              <button onClick={proceedDelete}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommunityDetails;
