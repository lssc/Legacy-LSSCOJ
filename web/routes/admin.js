const express = require('express');
const Admin = require('../controllers/admin');

const router = express.Router();

/* List all users */
router.get('/', Admin.list, (req, res) => {
  res.send(req.admins);
});

/* Add user to admin list */
router.post('/', Admin.add, (req, res) => {
  res.send(req.admin);
});

/* Remove user from admin list */
router.post('/:user_id', Admin.remove, (req, res) => {
  res.send('Removed!');
});

module.exports = router;
