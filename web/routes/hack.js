const express = require('express');
const Hacks = require('../models/index').hacks;

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  Hacks.findAll()
    .then((hacks) => res.render('hack/index', { hacks }))
    .catch((error) => { throw error; });
});

/* GET speficied hack */
router.get('/:id', (req, res) => {
  res.render('hack/show');
});

module.exports = router;
