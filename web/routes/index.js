const express = require('express');
const UserInfo = require('../controllers/user_info');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

/* GET login & register page */
router.get('/login', (req, res) => {
  console.log(req.session.user);
  res.render('login');
});

/* POST login user */
router.post('/login', UserInfo.login, (req, res) => {
  console.log(req.session.user);
  res.redirect('/');
});

/* POST registe user */
router.post('/registes', UserInfo.register, (req, res) => {
  console.log(req.session.user);
  res.redirect('/');
});

module.exports = router;
