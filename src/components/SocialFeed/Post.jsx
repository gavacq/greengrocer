import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Post.scss';

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
        console.log('likePost res', res);
        const newPosts = updatePosts(res.data.likes, res.data.likedByUser);
        console.log('newPosts', newPosts);
        setPosts(newPosts);
      });
  };

  return (
    <article className="post-container" data-post-id={post.id}>
      <h2>
        @
        {post.username}
      </h2>
      <button className="heart-btn" type="button" style={heartButtonStyle} onClick={handleHeartClick}>
        <img src="images/heart.png" style={post.likedByUser ? likedHeartStyle : unlikedHeartStyle} alt="like" />
      </button>
      <span>
        <strong>
          {/* eslint-disable-next-line */}
          {post.likes} </strong> likes
      </span>
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
