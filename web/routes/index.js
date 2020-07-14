const express = require('express');
const UserInfo = require('../models/index').user_info;

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

/* GET login & register page */
router.get('/login', (req, res) => {
  res.render('login');
});

/* POST login user */
router.post('/login', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  UserInfo.findOne({
    where: {
      username,
      password,
    },
  })
    .then((user) => {
      if (!user) {
        res.send('Login failed');
      } else {
        req.session.username = username;
        res.redirect('/');
      }
    })
    .catch((error) => { throw error; });
});

/* POST registe user */
router.post('/registes', (req, res) => {
  const { username } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  UserInfo.findOne({
    where: { username },
  })
    .then((user) => {
      if (user) {
        res.send('Username existed');
      } else {
        UserInfo.create({
          username,
          email,
          password,
        })
          .then(() => {
            require.session.username = username;
            res.redirect('/');
          })
          .catch((err) => res.send(err));
      }
    })
    .catch((err) => res.send(err));
});

module.exports = router;
