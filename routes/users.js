var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/rating');
});

/* GET user profile */
router.get('/:id', function(req, res, next ) {
  res.render('user/profile');
});

module.exports = router;
