import axios from 'axios';
import { React, useEffect, useState } from 'react';
import Post from './Post';

export default function SocialFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts')
      .then((res) => {
        console.log(res);
        setPosts(res);
      });
  }, []);

  return (
    <section>
      {posts.map((post) => <Post data={post} />)}
    </section>
  );
}
