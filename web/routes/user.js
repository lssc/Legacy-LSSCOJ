const express = require('express');
const UserInfo = require('../controllers/user_info');

const router = express.Router();

/* GET users listing. */
router.get('/', UserInfo.list, (req, res) => {
  res.render('user/rating', {
    users: req.users,
    isAdmin: req.isAdmin,
    isLogin: req.isLogin,
    cur_user: req.session.user,
  });
});

router.get('/:user_id/edit', (req, res) => {
  if (!req.isLogin) {
    res.redirect('/login');
  } else {
    res.render('user/edit', {
      isAdmin: req.isAdmin,
      isLogin: req.isLogin,
      cur_user: req.session.user,
    });
  }
});

router.post('/:user_id/edit', UserInfo.modify, (req, res) => {
  res.redirect(`/user/${req.params.user_id}`);
});

/* GET user profile */
router.get('/:user_id', UserInfo.retrieve, (req, res) => {
  res.render('user/profile', {
    profile: req.user,
    isAdmin: req.isAdmin,
    isLogin: req.isLogin,
    cur_user: req.session.user,
  });
});

module.exports = router;
