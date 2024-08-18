import React, { useEffect, useState } from 'react';

const ViewComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/comments');
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div>
      <h2>All Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewComments;
