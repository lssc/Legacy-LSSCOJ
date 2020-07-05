var express = require('express');
var router = express.Router();

/* GET contest list. */
router.get('/', function(req, res, next) {
  res.render('contest/index');
})

/* GET standings of contest */
router.get('/:id/standings', function(req, res, next) {
  res.render('contest/standings');
});

/* GET submissions of contest */
router.get('/:id/submissions', function(req, res, next) {
  res.render('contest/submissions');
});

/* GET speficied contest */
router.get('/:id', function(req, res, next) {
  res.render('contest/dashboard');
});

/* GET speficied problem in contest */
router.get('/:cid/problem/:pid', function(req, res, next) {
  res.render('contest/problem');
});

module.exports = router;