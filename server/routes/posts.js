const express = require('express');

const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const postsQuery = 'SELECT (posts.*), (users.username) FROM posts JOIN users ON users.id = user_id';
    const postsPromise = db.query(postsQuery);

    const likedPostsQuery = `SELECT posts.id FROM posts JOIN liked_posts ON liked_posts.post_id = posts.id WHERE liked_posts.user_id = ${req.session.user}`;
    const likedPostsPromise = db.query(likedPostsQuery);

    Promise.all([postsPromise, likedPostsPromise])
      .then((data) => {
        console.log(data[0].rows, data[1].rows);
        const posts = data[0].rows.map((p) => ({
          ...p,
          likedByUser: Boolean(data[1].rows.filter((r) => r.id === p.id).length),
        }));
        console.log('updated posts', posts);

        res.json(posts);
      })
      .catch((err) => {
        console.log(err);
        res.send('error');
      });
  });

  // router.patch('/', (req, res));
  return router;
};
