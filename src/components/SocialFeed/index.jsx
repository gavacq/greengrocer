import axios from 'axios';
import { React, useEffect } from 'react';
import Post from './Post';
import './index-social.scss';
import socket from '../../helpers/socket';
import { useAppContext } from '../../lib/context';

export default function SocialFeed() {
  const { postsContext } = useAppContext();
  const [posts, setPosts] = postsContext;

  const emitHeartClickEvent = (data) => {
    socket.emit('heartClick', data);
  };

  const updateLikesListener = (data) => {
    setPosts((prev) => ([
      ...prev.map((p) => {
        if (p.id === data.postId) {
          return { ...p, likes: data.postLikes };
        }
        return p;
      }),
    ]));
  };

  const addPostListener = (data) => {
    console.log('new post', data);
    setPosts((prev) => ([
      ...prev,
      data,
    ]));
  };

  useEffect(() => {
    axios.get('/api/posts')
      .then((res) => {
        setPosts(res.data);
      });

    socket.on('updateLikes', updateLikesListener);
    socket.on('addPost', addPostListener);

    return (() => {
      socket.removeAllListeners();
    });
  }, []);

  return (
    <section className="social-section">
      <div className="wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill" />
        </svg>
      </div>
      <div className="title-icon">
        <h1 className="social-title"> Social feed </h1>
        <img className="social-icon" src="./images/love.png" alt="social" />
      </div>
      <div className="temp">
        <div className="posts-wrapper">
          {posts.map((post) => (
            <Post
              className="co2"
              key={post.id}
              post={post}
              setPosts={setPosts}
              posts={posts}
              emitHeartClickEvent={emitHeartClickEvent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
