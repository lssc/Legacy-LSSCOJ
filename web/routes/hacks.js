var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('hack/index');
});

/* GET speficied hack */
router.get('/:id', function(req, res, next) {
    res.render('hack/show');
});

module.exports = router;
