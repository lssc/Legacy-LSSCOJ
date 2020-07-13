const express = require('express');
var router = express.Router();

const Problems = require('../models/index').problems;

/* GET prblem set. */
router.get('/', function(req, res, next) {
	Problems.findAll()
	.then(problems => res.render('problem/index', {'problems' : problems}))
	.catch(error => {throw error});
});

/* GET speficied problem */
router.get('/:id', function(req, res, next) {
	const id = req.params.id;

	Problems.findOne({
		where: {id: id}
	})
	.then(problem => {
		res.render('problem/show', {
			problem : problem,
			examples: []
		})
	})
	.catch(error => {throw error});
});

/* POST submit answer */
router.post('/:id', function(req, res, next) {
	if(req.session.username) {
		/* Push Submission */
		res.redirect('/');
	}
	else {
		res.redirect('/login');
	}
});

/* GET problem */
module.exports = router;
