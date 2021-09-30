import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function Post(props) {
  const {
    post, setPosts, posts,
  } = props;

  // post, setPosts, posts,
  const heartButtonStyle = {
    cursor: 'pointer',
    backgroundColor: 'rgba(1,1,1,0)',
    border: 'none',
  };

  const heartStyle = {
    width: '20px',
  };

  const updatePosts = (newLikes) => posts.map((p) => {
    if (p.id === post.id) {
      return ({
        ...p,
        likes: newLikes,
      });
    }
    return post;
  });

  const likePost = () => {
    axios.patch(`/api/posts/${post.id}`, { likes: 'increment' })
      .then((res) => {
        console.log('likePost res', res);
        const newPosts = updatePosts(res.data.likes);
        setPosts(() => ({
          ...newPosts,
        }));
      });
  };

  return (
    <article data-post-id={post.id}>
      <h1>Post</h1>
      <p>{post.username}</p>
      <button type="button" style={post.heartButtonStyle} onClick={likePost}>
        <img src="images/heart.png" style={heartStyle} alt="like" />
      </button>
      {post.likes}
      <p>{post.message}</p>
    </article>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    likedByUser: PropTypes.bool.isRequired,
  }).isRequired,
  setPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    likedByUser: PropTypes.bool.isRequired,
  })).isRequired,
};
