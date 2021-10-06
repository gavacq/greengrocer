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
    const postSql = 'SELECT (posts.*), (users.username) FROM posts JOIN users ON users.id = user_id WHERE posts.id = $1';
    const postValue = [id];
    return db.query(postSql, postValue);
  };

  const queryLikedPosts = (user) => {
    const likedPostsSql = 'SELECT posts.id FROM posts JOIN liked_posts ON liked_posts.post_id = posts.id WHERE liked_posts.user_id = $1';
    const likedPostsValue = [user];
    return db.query(likedPostsSql, likedPostsValue);
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
      let likedPostsSql = '';
      let postsSql = '';
      if (likedByUser) {
        likedPostsSql = 'INSERT INTO liked_posts (user_id, post_id) VALUES ($1, $2)';
        postsSql = 'UPDATE posts SET likes = likes + 1 WHERE posts.id = $1 RETURNING likes';
      } else {
        likedPostsSql = 'DELETE FROM liked_posts WHERE user_id = $1 AND post_id = $2';
        postsSql = 'UPDATE posts SET likes = likes - 1 WHERE posts.id = $1 RETURNING likes';
      }
      const likedPostsValues = [req.session.user, postId];
      const postsValue = [postId];
      const likedPostsPromise = db.query(likedPostsSql, likedPostsValues);
      const postsPromise = db.query(postsSql, postsValue);

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

    const sql = 'INSERT INTO posts(user_id, likes, message) VALUES($1, 0, $2) RETURNING id';
    const values = [req.session.user, post.message];
    db.query(sql, values)
      .then((data) => {
        console.log('posts insert res', data.rows[0]);
        return queryPost(data.rows[0].id);
      })
      .then((data) => {
        console.log('post query res', data.rows[0]);

        res.json(data.rows[0]);
      })
      .catch((e) => {
        console.log('error:', e);
        res.json({});
      });
  });

  return router;
};
