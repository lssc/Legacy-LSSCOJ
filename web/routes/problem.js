const express = require('express');
const Problems = require('../controllers/problems');
const ProblemsSamples = require('../controllers/problems_samples');
const ProblemsTags = require('../controllers/problems_tags');
const Submissions = require('../controllers/submissions');

const router = express.Router();

/* GET prblem set. */
router.get('/', Problems.list, (req, res) => {
  res.render('problem/index', {
    problems: req.problems,
    isAdmin: req.isAdmin,
    isLogin: req.isLogin,
    cur_user: req.session.user,
  });
});

/* GET problem creating page */
router.get('/create', (req, res) => {
  if (req.isLogin) {
    res.render('problem/create', {
      isAdmin: req.isAdmin,
      isLogin: req.isLogin,
      cur_user: req.session.user,
    });
  } else {
    res.redirect('/login');
  }
});

/* POST create request */
router.post('/create', Problems.add, (req, res) => {
  res.redirect(`/problem/${req.problem.id}/settings`);
});

/* GET problem setting page */
router.get('/:problem_id/settings', Problems.retrieve, ProblemsSamples.list, ProblemsTags.list, (req, res) => {
  if (req.isLogin) {
    res.render('problem/settings', {
      problem: req.problem,
      examples: req.problem_samples,
      tags: req.problem_tags,
      isAdmin: req.isAdmin,
      isLogin: req.isLogin,
      cur_user: req.session.user,
    });
  } else {
    res.redirect('/login');
  }
});

/* POST modifies */
router.post('/:problem_id/modify', Problems.checkEditor, Problems.modify, (req, res) => {
  res.redirect(`/problem/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/createSample/', Problems.checkEditor, ProblemsSamples.add, (req, res) => {
  res.redirect(`/problem/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/modifySample/:sample_id', Problems.checkEditor, ProblemsSamples.modify, (req, res) => {
  res.redirect(`/problem/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/deleteSample/:sample_id', Problems.checkEditor, ProblemsSamples.remove, (req, res) => {
  res.redirect(`/problem/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/createTag/', Problems.checkEditor, ProblemsTags.add, (req, res) => {
  res.redirect(`/problem/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/deleteTag/:tag', Problems.checkEditor, ProblemsTags.remove, (req, res) => {
  res.redirect(`/problem/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/createPermission/', Problems.checkEditor, Problems.addEditor, (req, res) => {
  res.redirect(`/problem/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/deletePermission/:user_id', Problems.checkEditor, Problems.removeEditor, (req, res) => {
  res.redirect(`/problem/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/delete', Problems.checkEditor, Problems.remove, (req, res) => {
  res.redirect('/problem');
});

/* GET speficied problem */
router.get('/:problem_id', Problems.retrieve, ProblemsSamples.list, ProblemsTags.list, (req, res) => {
  res.render('problem/show', {
    problem: req.problem,
    examples: req.problem_samples,
    tags: req.problem_tags,
    isAdmin: req.isAdmin,
    isLogin: req.isLogin,
    cur_user: req.session.user,
  });
});

/* POST submit answer */
router.post('/:problem_id', Submissions.add, (req, res) => {
  res.redirect('/submission');
});

/* GET problem */
module.exports = router;
