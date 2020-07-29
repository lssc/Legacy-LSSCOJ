const express = require('express');
const Submissions = require('../controllers/submissions');

const router = express.Router();

/* GET submission list. */
router.get('/', Submissions.list, (req, res) => {
  res.render('submission/index', { submissions: req.submissions });
});

/* GET submission detail */
router.get('/:submission_id', Submissions.retrieve, (req, res) => {
  res.render('submission/show', { submission: req.submission });
});

module.exports = router;
