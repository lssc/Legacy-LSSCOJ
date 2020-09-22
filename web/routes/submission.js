const express = require('express');
const Submissions = require('../controllers/submissions');

const router = express.Router();

/* GET submission list. */
router.get('/', Submissions.list, async (req, res) => {
  res.render('submission/index', {
    submissions: req.submissions,
    isAdmin: req.isAdmin,
    isLogin: req.isLogin,
    cur_user: req.session.user,
  });
});

/* GET submission detail */
router.get('/:submission_id', Submissions.retrieve, async (req, res) => {
  res.render('submission/show', {
    submission: req.submission,
    isAdmin: req.isAdmin,
    isLogin: req.isLogin,
    cur_user: req.session.user,
  });
});

module.exports = router;
