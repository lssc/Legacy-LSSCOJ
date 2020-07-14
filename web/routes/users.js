const express = require('express');
const UserInfo = require('../models/index').user_info;

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  UserInfo.findAll()
    .then((users) => res.render('user/rating', { users }))
    .catch((error) => { throw error; });
});

/* GET user profile */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  UserInfo.findOne({
    where: { id },
  })
    .then((user) => res.render('user/profile', { profile: user }))
    .catch((error) => { throw error; });
});

module.exports = router;
