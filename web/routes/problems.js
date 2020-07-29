const express = require('express');
const Problems = require('../controllers/problems');
const ProblemsPermissions = require('../controllers/problems_permissions');
const ProblemsSamples = require('../controllers/problems_samples');
const ProblemsTags = require('../controllers/problems_tags');

const router = express.Router();

/* GET prblem set. */
router.get('/', Problems.list);

/* GET speficied problem */
router.get('/:problem_id', Problems.retrieve, ProblemsSamples.list, ProblemsTags.list, (req, res) => {
  res.render('problem/show', {
    problem: req.problem,
    examples: req.problem_samples,
    tags: req.problem_tags,
  });
});

/* GET problem creating page */
router.get('/create', (req, res) => {
  res.render('problem/createInfo');
});

/* POST create request */
router.post('/create', Problems.add, ProblemsPermissions.add, (req, res) => {
  res.redirect('/:problem_id/settings');
});

/* GET problem setting page */
router.get('/:problem_id/settings', Problems.retrieve, ProblemsSamples.list, ProblemsTags.list, ProblemsPermissions.list, (req, res) => {
  res.render('problem/settings', {
    problem: req.problem,
    examples: req.problem_samples,
    tags: req.problem_tags,
  });
});

/* POST modifies */
router.post('/:problem_id/modify', Problems.modify, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/createSample/', ProblemsSamples.add, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/modifySample/:sample_id', ProblemsSamples.modify, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/deleteSample/:sample_id', ProblemsSamples.remove, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/createTag/', ProblemsTags.add, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/deleteTag/:tag_id', ProblemsTags.remove, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/createPermission/', ProblemsPermissions.add, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});
router.post('/:problem_id/deletePermission/:user_id', ProblemsPermissions.remove, (req, res) => {
  res.redirect(`/problems/${req.params.problem_id}/settings`);
});

/* POST submit answer */
router.post('/:problem_id', (req, res) => {
  if (req.session.user.user_id) {
    res.redirect('/submission/create');
  } else {
    res.redirect('/login');
  }
});

/* GET problem */
module.exports = router;
