const express = require('express');
const Problems = require('../controllers/problems');
const ProblemsPermissions = require('../controllers/problems_permissions');
const ProblemsSamples = require('../controllers/problems_samples');
const ProblemsTags = require('../controllers/problems_tags');

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
router.post('/create', Problems.add, ProblemsPermissions.add, (req, res) => {
  res.redirect(`/problems/${req.problem.id}/settings`);
});

/* GET problem setting page */
router.get('/:problem_id/settings', Problems.retrieve, ProblemsSamples.list, ProblemsTags.list, ProblemsPermissions.list, (req, res) => {
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
router.post('/:problem_id/modify', ProblemsPermissions.check, Problems.modify, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/createSample/', ProblemsPermissions.check, ProblemsSamples.add, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/modifySample/:sample_id', ProblemsPermissions.check, ProblemsSamples.modify, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/deleteSample/:sample_id', ProblemsPermissions.check, ProblemsSamples.remove, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/createTag/', ProblemsPermissions.check, ProblemsTags.add, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/deleteTag/:tag', ProblemsPermissions.check, ProblemsTags.remove, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/createPermission/', ProblemsPermissions.check, ProblemsPermissions.add, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/deletePermission/:user_id', ProblemsPermissions.check, ProblemsPermissions.remove, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/delete', ProblemsPermissions.check, Problems.remove, (req, res) => {
  res.redirect('/problems');
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
router.post('/:problem_id', (req, res) => {
  if (req.session.user.id) {
    res.redirect('/submission/create', {
      isAdmin: req.isAdmin,
      isLogin: req.isLogin,
      cur_user: req.session.user,
    });
  } else {
    res.redirect('/login');
  }
});

/* GET problem */
module.exports = router;
