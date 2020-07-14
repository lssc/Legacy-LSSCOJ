const express = require('express');
const Problems = require('../models/index').problems;

const router = express.Router();

/* GET prblem set. */
router.get('/', (req, res) => {
  Problems.findAll()
    .then((problems) => res.render('problem/index', { problems }))
    .catch((error) => { throw error; });
});

/* GET speficied problem */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Problems.findOne({
    where: { id },
  })
    .then((problem) => {
      res.render('problem/show', {
        problem,
        examples: [],
      });
    })
    .catch((error) => { throw error; });
});

/* POST submit answer */
router.post('/:id', (req, res) => {
  if (req.session.username) {
    /* Push Submission */
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

/* GET problem */
module.exports = router;
