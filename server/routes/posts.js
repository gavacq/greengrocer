const express = require('express');

const router = express.Router();

module.exports = (db, io) => {
  // socket.io handlers
  io.on('connection', (socket) => {
    socket.on('heartClick', (data) => {
      socket.broadcast.emit('updateLikes', data);
    });

    socket.on('shareList', (data) => {
      socket.broadcast.emit('addPost', data);
    });
  });

  // query helpers
  const queryPosts = () => {
    const postsQuery = 'SELECT (posts.*), (users.username) FROM posts JOIN users ON users.id = user_id';
    return db.query(postsQuery);
  };

  const queryPost = (id) => {
    const postQuery = `SELECT (posts.*), (users.username) FROM posts JOIN users ON users.id = user_id WHERE posts.id = ${id}`;
    return db.query(postQuery);
  };

  const queryLikedPosts = (user) => {
    const likedPostsQuery = `SELECT posts.id FROM posts JOIN liked_posts ON liked_posts.post_id = posts.id WHERE liked_posts.user_id = ${user}`;
    return db.query(likedPostsQuery);
  };

  const addLikedFlagToPosts = (ogPosts, likedPosts) => ogPosts.map((p) => ({
    ...p,
    likedByUser: Boolean(likedPosts.filter((r) => r.id === p.id).length),
  }));

  // Read all posts
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

  // update likes for a post
  router.patch('/:postId', (req, res) => {
    const updateLikes = (likedByUser, postId) => {
      let likedPostsQuery = '';
      let postsQuery = '';
      if (likedByUser) {
        likedPostsQuery = `INSERT INTO liked_posts (user_id, post_id) VALUES (${req.session.user}, ${postId})`;
        postsQuery = `UPDATE posts SET likes = likes + 1 WHERE posts.id = ${postId} RETURNING likes`;
      } else {
        likedPostsQuery = `DELETE FROM liked_posts WHERE user_id = ${req.session.user} AND post_id = ${postId}`;
        postsQuery = `UPDATE posts SET likes = likes - 1 WHERE posts.id = ${postId} RETURNING likes`;
      }
      const likedPostsPromise = db.query(likedPostsQuery);
      const postsPromise = db.query(postsQuery);

      // eslint-disable-next-line max-len
      return Promise.all([likedPostsPromise, postsPromise]).then((data) => ({ likedByUser, likes: data[1].rows[0].likes }));
    };
    // likedByUser in req is the opposite of the current state, i.e. an action
    const { likedByUser, likes, postId } = req.body;
    if (!req.session.user) {
      res.json({ likes, likedByUser: !likedByUser });
    } else {
      updateLikes(likedByUser, postId)
        .then((data) => {
          console.log('data', data);
          res.json({ likes: data.likes, likedByUser: data.likedByUser });
        })
        .catch((error) => {
          console.log(error);
          res.json({ likes, likedByUser: !likedByUser });
        });
    }
  });

  // create a new post
  router.put('/', (req, res) => {
    const { post } = req.body;
    console.log('server received post', post);

    if (!req.session || !req.session.user) {
      console.log('Non-logged in user is unable to create a post');
      res.json({});
      return;
    }

    const sql = `INSERT INTO posts(user_id, likes, message) VALUES(${req.session.user}, 0, '${post.message}') RETURNING id`;
    db.query(sql)
      .then((data) => {
        console.log('posts insert res', data.rows[0]);
        return queryPost(data.rows[0].id);
      })
      .then((data) => {
        console.log('post query res', data.rows[0]);

        res.json(data.rows[0]);
      })
      .catch((e) => console.log('error:', e));
  });

  return router;
};
