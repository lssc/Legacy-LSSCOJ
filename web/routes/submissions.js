const express = require('express');
const Submissions = require('../controllers/submissions');
const UserInfo = require('../controllers/user_info');
const Problems = require('../controllers/problems');

const router = express.Router();

/* GET submission list. */
router.get('/', Submissions.list, async (req, res) => {
  // get username & problem's title first
  /*for (let key = 0; key < req.submissions.length; key += 1) {
    req.params.user_id = req.submissions[key].submitter_id;
    req.params.problem_id = req.submissions[key].problem_id;
    req.submissions[key].submitter = (await UserInfo.retrieve(req, res)).username;
    req.submissions[key].problemTitle = (await Problems.retrieve(req, res)).title;
  }*/

  req.submissions.forEach(async submission => {
    req.params.user_id = req.submission.submitter_id;
    req.params.problem_id = req.submission.problem_id;
    req.submission.submitter = (await UserInfo.retrieve(req, res)).username;
    req.submission.problemTitle = (await Problems.retrieve(req, res)).title;
  });

  res.render('submission/index', {
    submissions: req.submissions,
    isAdmin: req.isAdmin,
    isLogin: req.isLogin,
    cur_user: req.session.user,
  });
});

/* GET submission detail */
router.get('/:submission_id', Submissions.retrieve, async (req, res) => {
  // get username & problem's title first{}
  req.params.user_id = req.submission.submitter_id;
  req.params.problem_id = req.submission.problem_id;
  req.submission.submitter = (await UserInfo.retrieve(req, res)).username;
  req.submission.problemTitle = (await Problems.retrieve(req, res)).title;

  res.render('submission/show', {
    submission: req.submission,
    isAdmin: req.isAdmin,
    isLogin: req.isLogin,
    cur_user: req.session.user,
  });
});

module.exports = router;
