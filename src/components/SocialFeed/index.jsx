import axios from 'axios';
import { React, useEffect, useState } from 'react';
import Post from './Post';
import './index-social.scss';
import socket from '../../helpers/socket';

export default function SocialFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket is connected', socket.id);

      socket.on('disconnect', () => {
        console.log('disconnected');
      });
    });

    axios.get('/api/posts')
      .then((res) => {
        setPosts(res.data);
      });
    return (() => {
      console.log(`socket ${socket.id} disconnecting...`);
      socket.disconnect();
    });
  }, []);

  return (
    <section className="social-section">
      <img className="social-icon" src="./images/love.png" alt="social" />
      <div className="wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill" />
        </svg>
      </div>
      <h1 className="social-title">Social feed</h1>
      <div className="posts-wrapper">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            setPosts={setPosts}
            posts={posts}
          />
        ))}
      </div>
    </section>
  );
}
