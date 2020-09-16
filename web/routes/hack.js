const express = require('express');
const Hacks = require('../models/hack');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  Hacks.find()
    .exec((err, hacks) => {
      if (err) throw err;
      res.render('hack/index', { hacks });
    });
});

/* GET speficied hack */
router.get('/:id', (req, res) => {
  res.render('hack/show');
});

module.exports = router;
