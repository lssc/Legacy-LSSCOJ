const express = require('express');
const UserInfo = require('../controllers/user_info');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    isAdmin: req.isAdmin,
    isLogin: req.isLogin,
    cur_user: req.session.user,
  });
});

/* GET login & register page */
router.get('/login', (req, res) => {
  res.render('login');
});

/* POST login user */
router.post('/login', UserInfo.login, (req, res) => {
  console.log('login done');
  res.redirect('/');
});

/* POST logout user */
router.post('/logout', UserInfo.logout, (req, res) => {
  console.log('logout done');
  res.redirect('/');
});

/* POST registe user */
router.post('/registes', UserInfo.register, (req, res) => {
  res.redirect('/');
});

module.exports = router;
