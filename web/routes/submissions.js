const express = require('express');
const Submissions = require('../models/index').submissions;

const router = express.Router();

/* GET submission list. */
router.get('/', (req, res) => {
  Submissions.findAll()
    .then((submissions) => res.render('submission/index', { submissions }))
    .catch((error) => { throw error; });
});

/* GET submission detail */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Submissions.findOne({
    where: { id },
  })
    .then((submission) => res.render('submission/show', submission))
    .catch((error) => { throw error; });
});

module.exports = router;
