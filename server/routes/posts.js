const express = require('express');

const router = express.Router();

module.exports = (db) => {
  const queryPosts = () => {
    const postsQuery = 'SELECT (posts.*), (users.username) FROM posts JOIN users ON users.id = user_id';
    return db.query(postsQuery);
  };

  const queryLikedPosts = (user) => {
    const likedPostsQuery = `SELECT posts.id FROM posts JOIN liked_posts ON liked_posts.post_id = posts.id WHERE liked_posts.user_id = ${user}`;
    return db.query(likedPostsQuery);
  };

  const addLikedFlagToPosts = (ogPosts, likedPosts) => ogPosts.map((p) => ({
    ...p,
    // eslint-disable-next-line max-len
    likedByUser: Boolean(likedPosts.filter((r) => r.id === p.id).length),
  }));

  // eslint-disable-next-line max-len
  // likedByUser: (!likedPosts.rows.length ? Boolean(likedPosts.filter((r) => r.id === p.id).length) : false),
  router.get('/', (req, res) => {
    if (!req.session.user) {
      console.log('USER NOT LOGGED IN');

      // no user is logged in, only show posts without indication that the user has liked them
      queryPosts()
        .then((data) => {
          const posts = addLikedFlagToPosts(data.rows, []);
          console.log('non logged in posts', posts);
          res.json(posts);
        })
        .catch((err) => {
          console.log(err);
          res.send('error');
        });
    } else {
      console.log('USER LOGGED IN', req.session.user);
      // a user is logged in, query liked_posts to see which posts a user has liked
      Promise.all([queryPosts(), queryLikedPosts(req.session.user)])
        .then((data) => {
          const posts = addLikedFlagToPosts(data[0].rows, data[1].rows);
          res.json(posts);
        })
        .catch((err) => {
          console.log(err);
          res.send('error');
        });
    }
  });

  // router.patch('/', (req, res));
  return router;
};
