import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function Post(props) {
  const {
    id, username, likes, message, setPosts, posts,
  } = props;

  const heartButtonStyle = {
    cursor: 'pointer',
    backgroundColor: 'rgba(1,1,1,0)',
    border: 'none',
  };

  const heartStyle = {
    width: '20px',
  };

  const updatePosts = (newLikes) => posts.map((post) => {
    if (post.id === id) {
      return ({
        ...post,
        likes: newLikes,
      });
    }
    return post;
  });

  const likePost = () => {
    axios.patch(`/api/posts/${id}`, { likes: 'increment' })
      .then((res) => {
        console.log('likePost res', res);
        const newPosts = updatePosts(res.data.likes);
        setPosts(() => ({
          ...newPosts,
        }));
      });
  };

  return (
    <article data-post-id={id}>
      <h1>Post</h1>
      <p>{username}</p>
      <button type="button" style={heartButtonStyle} onClick={likePost}>
        <img src="images/heart.png" style={heartStyle} alt="like" />
      </button>
      {likes}
      <p>{message}</p>
    </article>
  );
}

Post.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  setPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
};
