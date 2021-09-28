import React from 'react';
import PropTypes from 'prop-types';

export default function Post(props) {
  const {
    id, username, likes, message,
  } = props;
  return (
    <article data-post-id={id}>
      <h1>Post</h1>
      <p>{username}</p>
      <p>{likes}</p>
      <p>{message}</p>
    </article>
  );
}

Post.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  message: PropTypes.number.isRequired,
};
