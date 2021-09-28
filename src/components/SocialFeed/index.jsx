import axios from 'axios';
import { React, useEffect, useState } from 'react';
import Post from './Post';

export default function SocialFeed() {
  const [posts, setPosts] = useState([]);

  console.log('posts', posts);

  useEffect(() => {
    axios.get('/api/posts')
      .then((res) => {
        console.log('posts', res.data);
        setPosts(res.data);
      });
  }, []);

  return (
    <section>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          likes={post.likes}
          message={post.message}
          setPosts={setPosts}
          posts={posts}
        />
      ))}
    </section>
  );
}
