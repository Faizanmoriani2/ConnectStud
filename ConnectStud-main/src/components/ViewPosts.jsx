import React, { useEffect, useState } from 'react';

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewPosts;
