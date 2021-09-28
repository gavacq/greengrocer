import { React, useEffect, useState } from 'react';
import Post from './Post';

export default function SocialFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <section>
      {posts.map((post) => <Post data={post} />)}
    </section>
  );
}
