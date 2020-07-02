var express = require('express');
var router = express.Router();

/* GET submission list. */
router.get('/', function(req, res, next) {
    res.render('submission/index');
});

/* GET submission detail */
router.get('/:id', function(req, res, next ) {
    res.render('submission/show')
});

module.exports = router;
