const express = require('express');
const Contests = require('../models/index').contests;
const ContestsProblems = require('../models/index').contests_problems;
const ContestsSubmissions = require('../models/index').contests_submissions;
const Problems = require('../models/problems').problems;

const router = express.Router();

/* GET contest list. */
router.get('/', (req, res) => {
  /* Current & Upcoming contests */
  const contests = Contests.findAll({
    exclude: [
      {
        where: { status: 'finished' },
      },
    ],
  });

  /* Ended contests */
  const contests2 = Contests.findAll({
    where: { status: 'finished' },
  });

  Promise.all([contests, contests2]).then(([active, passed]) => {
    res.render('contest/index', {
      active_contests: active,
      passed_contests: passed,
    });
  })
    .catch((error) => { throw error; });
});

/* GET speficied contest */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  /* The Contest */
  const contests = Contests.findOne({
    where: { id },
  });

  /* Contest Problems */
  const contestProblems = ContestsProblems.findAll({
    where: { contest_id: id },
  });

  Promise.all([contests, contestProblems]).then(([contest, problems]) => {
    res.render('contest/dashboard', {
      contest,
      problems,
    });
  })
    .catch((error) => { throw error; });
});

/* GET standings of contest */
router.get('/:id/standings', (req, res) => {
  const { id } = req.params;

  /* Contest Problems */
  const contestsProblem = ContestsProblems.findAll({
    where: { contest_id: id },
  });

  /* Get User's score for each problem by Contest Submissions */
  const contestsSubmissions = ContestsSubmissions.findAll({
    where: { contest_id: id },
  });

  Promise.all([contestsProblem, contestsSubmissions]).then(([problem, submissions]) => {
    const users = [];

    submissions.forEach((row) => {
      const currentScore = users[row.submitter][row.problem_id];
      if (currentScore < row.score) {
        users[row.submitter][row.problem_id] = row.score;
      }
    });

    res.render('contest/standings', {
      problem,
      users,
    });
  })
    .catch((error) => { throw error; });
});

/* GET submissions of contest */
router.get('/:id/submissions', (req, res) => {
  const { id } = req.params;

  ContestsSubmissions.findAll({
    where: { contest_id: id },
  })
    .then((submissions) => {
      res.render('contest/submissions', {
        submissions,
      });
    })
    .catch((error) => { throw error; });
});

/* GET speficied problem in contest */
router.get('/:cid/problem/:pid', (req, res) => {
  const { id } = req.params;

  Problems.findOne({
    where: { id },
  })
    .then((problem) => res.render('contest/problem', problem))
    .catch((error) => { throw error; });
});

module.exports = router;
