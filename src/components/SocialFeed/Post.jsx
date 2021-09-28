import React from 'react';
import PropTypes from 'prop-types';

export default function Post(props) {
  const {
    id, username, likes, message,
  } = props;

  const heartButtonStyle = {
    cursor: 'pointer',
    backgroundColor: 'rgba(1,1,1,0)',
    border: 'none',
  };

  const heartStyle = {
    width: '20px',
  };

  const likePost = () => {

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
};
