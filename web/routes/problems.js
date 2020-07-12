const express = require('express');
var router = express.Router();

const Problems = require('../models/index').problems;

/* GET problem set. */
router.get('/', function(req, res, next) {
	console.log('ok');
	Problems.findAll()
	.then(problems => res.render('problem/index', {'problems' : problems}))
	.catch(error => res.send(error));
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
	.catch(error => res.send(error));
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
