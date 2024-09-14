import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NewsFeedPage.css';
import UserPage from "./UserPage";

export const NewsFeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState({});
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchNewsfeed = async () => {
            const token = localStorage.getItem('accessToken');

            try {
                const response = await fetch('http://localhost:5000/api/newsfeed', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || 'Failed to fetch newsfeed');
                }
            } catch (err) {
                setError('An error occurred. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchNewsfeed();
    }, []);

    const handleAddComment = async (postId) => {
        const token = localStorage.getItem('accessToken');
        const commentContent = newComment[postId];

        if (!commentContent) return;

        try {
            const response = await fetch(`http://localhost:5000/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ post: postId, content: commentContent }),
            });

            if (response.ok) {
                const newComment = await response.json();
                setPosts(posts.map(post => 
                    post._id === postId ? { 
                        ...post, 
                        comments: [...post.comments, newComment] 
                    } : post
                ));
                setNewComment({ ...newComment, [postId]: '' });
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to add comment');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleDeleteComment = async (postId, commentId) => {
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setPosts(posts.map(post =>
                    post._id === postId ? {
                        ...post,
                        comments: post.comments.filter(comment => comment._id !== commentId)
                    } : post
                ));
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to delete comment');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleCommentChange = (postId, value) => {
        setNewComment({ ...newComment, [postId]: value });
    };

    return (
        <>
        <UserPage />
        <div className="newsfeed">
            <h1 className='g'>Newsfeed</h1>
            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <p>Loading newsfeed...</p>
            ) : posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className="post">
                        <div className="post-header">
                            <img
                                src={`http://localhost:5000${post.author.profileImage || '/uploads/default-avatar.png'}`}
                                alt={post.author.username}
                                className="post-author-image"
                            />
                            <div>
                                <p className="post-author">{post.author.username}</p>
                                <p className="post-community">
                                    <Link to={`/communities/${post.community._id}`}>
                                        {post.community.name}
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <p className="post-content">{post.content}</p>
                        {post.image && <img src={`http://localhost:5000${post.image}`} alt="Post content" className="post-image" />}
                        <div className="comments-section">
                            <h3>Comments</h3>
                            {post.comments.length > 0 ? (
                                post.comments.map((comment) => (
                                    <div key={comment._id} className="comment">
                                        <p className="comment-author">{comment.author.username}:</p>
                                        <p className="comment-content">{comment.content}</p>
                                        {(comment.author._id === userId || post.author._id === userId) && (
                                            <button 
                                                onClick={() => handleDeleteComment(post._id, comment._id)}
                                                className="comment-delete-button"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="no-comments">No comments yet. Be the first to comment!</p>
                            )}
                            <div className="add-comment-section">
                                <input
                                    type="text"
                                    value={newComment[post._id] || ''}
                                    onChange={(e) => handleCommentChange(post._id, e.target.value)}
                                    placeholder="Add a comment..."
                                    className="comment-input"
                                />
                                <button onClick={() => handleAddComment(post._id)} className="comment-submit-button">
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-posts-message">You haven't joined any communities yet. Join a community to see more content!</p>
            )}
        </div>
        </>
    );
};
