const express = require('express');
const UserInfo = require('../controllers/user_info');

const router = express.Router();

/* GET users listing. */
router.get('/', UserInfo.list, (req, res) => {
  res.render('user/rating', { users: req.users });
});

/* GET user profile */
router.get('/:user_id', UserInfo.retrieve, (req, res) => {
  res.render('user/profile', { profile: req.user })
});

module.exports = router;
