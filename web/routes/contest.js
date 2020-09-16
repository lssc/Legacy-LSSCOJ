const express = require('express');
const Contest = require('../controllers/contests');
const Submission = require('../models/submission');

const router = express.Router();

/* GET contest list. */
router.get('/', Contest.list, (req, res) => {
  const { futureContests, passedContests } = req;
  res.render('contest/index', {
    futureContests,
    passedContests,
  });
});

/* GET speficied contest */
router.get('/:id', Contest.retrieve, (req, res) => {
  const { contest } = req;
  res.render('contest/dashboard', {
    contest,
  });
});

/* GET standings of contest */
router.get('/:id/standings', Contest.retrieve, (req, res) => {
  const { contest: { problems, registrants } } = req;

  const contestParticipants = registrants.map(async (user) => problems.map(async (problem) => {
    Submission.find({
      submitter: user,
      problem,
    }).sort(['submit_time', 'desc'])
      .exec((err, submission) => {
        if (err) throw err;
      });
  }));

  Promise.all([contestParticipants]).then(([participant]) => {
    const users = [];

    res.render('contest/standings', {
      problem,
      users,
      isLogin: req.isLogin,
      cur_username: req.session.user.username,
    });
  })
    .catch((error) => { throw error; });
});

/* GET submissions of contest */
router.get('/:id/submission', Contest.retrieve, (req, res) => {
  const { contest } = req;
  Submission.find({
    contest_id: contest._id,
  }).sort('submit_time', 'desc')
    .exec((err, submissions) => {
      if (err) throw err;
      res.render('contest/submission', {
        submissions,
      });
    });
});

/* GET speficied problem in contest */
router.get('/:cid/problem/:pid', Contest.retrieve, (req, res) => {
  const { contest } = req;

  res.render('contest/problem', contest.problem);
});

module.exports = router;
