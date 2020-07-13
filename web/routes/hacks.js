const express = require('express');
var router = express.Router();

const Hacks = require('../models/index').hacks;

/* GET home page. */
router.get('/', function(req, res, next) {
	Hacks.findAll()
	.then(hacks => res.render('hack/index', {hacks : hacks}))
	.catch(error => {throw error})
});

/* GET speficied hack */
router.get('/:id', function(req, res, next) {
    res.render('hack/show');
});

module.exports = router;
