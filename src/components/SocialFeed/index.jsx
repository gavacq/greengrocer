import axios from 'axios';
import { React, useEffect, useState } from 'react';
import Post from './Post';

export default function SocialFeed() {
  const [posts, setPosts] = useState([]);

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
          post={post}
          setPosts={setPosts}
          posts={posts}
        />
      ))}
    </section>
  );
}
