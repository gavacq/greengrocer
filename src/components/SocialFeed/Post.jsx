import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function Post(props) {
  const {
    post, setPosts, posts,
  } = props;

  const heartButtonStyle = {
    cursor: 'pointer',
    backgroundColor: 'rgba(1,1,1,0)',
    border: 'none',
  };

  const unlikedHeartStyle = {
    width: '20px',
  };

  const likedHeartStyle = {
    width: '20px',
    backgroundColor: 'pink',
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
        console.log('newPosts', newPosts);
        setPosts((prev) => ({
          prev,
        }));
      });
  };

  return (
    <article data-post-id={post.id}>
      <h1>Post</h1>
      <p>{post.username}</p>
      <button type="button" style={heartButtonStyle} onClick={likePost}>
        <img src="images/heart.png" style={post.likedByUser ? likedHeartStyle : unlikedHeartStyle} alt="like" />
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
