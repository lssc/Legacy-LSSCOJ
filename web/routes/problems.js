const express = require('express');
const Problems = require('../controllers/problems');
const ProblemsPermissions = require('../controllers/problems_permissions');
const ProblemsSamples = require('../controllers/problems_samples');
const ProblemsTags = require('../controllers/problems_tags');

const router = express.Router();

/* GET prblem set. */
router.get('/', Problems.list, (req, res) => {
  res.send(req.problems);
});

/* GET speficied problem */
router.get('/:problem_id', Problems.retrieve, ProblemsSamples.list, ProblemsTags.list, (req, res) => {
  /*res.render('problem/show', {
    problem: req.problem,
    examples: req.problem_samples,
    tags: req.problem_tags,
  });*/
  res.send({
    problem: req.problem,
    examples: req.problem_samples,
    tags: req.problem_tags,
  });
});

/* GET problem creating page */
router.get('/create', (req, res) => {
  res.render('problem/create');
});

/* POST create request */
router.post('/create', Problems.add, ProblemsPermissions.add, (req, res) => {
  res.redirect(`/problems/${req.problem.id}/settings`);
});

/* GET problem setting page */
router.get('/:problem_id/settings', Problems.retrieve, ProblemsSamples.list, ProblemsTags.list, ProblemsPermissions.list, (req, res) => {
  /*res.render('problem/settings', {
    problem: req.problem,
    examples: req.problem_samples,
    tags: req.problem_tags,
  });*/
  res.send({
    problem: req.problem,
    examples: req.problem_samples,
    tags: req.problem_tags,
    permit: req.problem_permissions,
  });
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
router.post('/:problem_id/deleteTag/:tag_id', ProblemsPermissions.check, ProblemsTags.remove, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/createPermission/', ProblemsPermissions.check, ProblemsPermissions.add, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/deletePermission/:user_id', ProblemsPermissions.check, ProblemsPermissions.remove, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});

/* POST submit answer */
router.post('/:problem_id', (req, res) => {
  if (req.session.user.id) {
    res.redirect('/submission/create');
  } else {
    res.redirect('/login');
  }
});

/* GET problem */
module.exports = router;
