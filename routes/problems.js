var express = require('express');
var router = express.Router();

/* GET prblem set. */
router.get('/', function(req, res, next) {
  res.render('problem/index');
});

/* GET speficied problem */
router.get('/:id', function(req, res, next) {
  res.render('problem/show');
});

/* POST submit answer */
router.post('/:id', function(req, res, next) {

});

/* GET problem */
module.exports = router;
