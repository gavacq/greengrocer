import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Post.scss';

export default function Post(props) {
  const {
    post, setPosts, posts, emitHeartClickEvent,
  } = props;

  const heartButtonStyle = {
    cursor: 'pointer',
    backgroundColor: 'rgba(1,1,1,0)',
    border: 'none',
  };

  const updatePosts = (newLikes, newLikedByUser) => posts.map((p) => {
    if (p.id === post.id) {
      return ({
        ...p,
        likes: newLikes,
        likedByUser: newLikedByUser,
      });
    }
    return p;
  });

  const handleHeartClick = () => {
    const req = { likedByUser: !post.likedByUser, likes: post.likes, postId: post.id };
    axios.patch(`/api/posts/${post.id}`, req)
      .then((res) => {
        const newPosts = updatePosts(res.data.likes, res.data.likedByUser);
        setPosts(newPosts);
        emitHeartClickEvent(newPosts);
      });
  };

  // change heart icon: filled in when liked
  const changeHeartIcon = () => {
    if (post.likedByUser) {
      return 'fas fa-heart';
    }
    return 'far fa-heart';
  };

  return (
    <article className="post-container" data-post-id={post.id}>
      <h2 className="username">
        @
        {post.username}
      </h2>
      <p className="post-message">{post.message}</p>
      <div className="likes-flexbox">
        <button className="heart-btn" type="button" style={heartButtonStyle} onClick={handleHeartClick}>
          <i className={changeHeartIcon()} />
        </button>
        <div className="likes">
          <strong>
            {/* eslint-disable-next-line */}
            {post.likes}  </strong> likes
        </div>
      </div>
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
  emitHeartClickEvent: PropTypes.func.isRequired,
};
