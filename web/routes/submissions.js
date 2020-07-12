const express = require('express');
var router = express.Router();

const Submissions = require('../models/index').submissions;

/* GET submission list. */
router.get('/', function(req, res, next) {
	Submissions.findAll()
	.then(submissions => res.render('submission/index', {submissions : submissions}))
	.catch(error => {throw error});
});

/* GET submission detail */
router.get('/:id', function(req, res, next ) {
	const id = req.params.id;

	Submissions.findOne({
		where: {id: id}
	})
	.then(submission => res.render('submission/show', submission))
	.catch(error => {throw error});
});

module.exports = router;
