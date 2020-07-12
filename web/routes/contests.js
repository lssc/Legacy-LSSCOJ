const express = require('express');
var router = express.Router();

const Contests = require('../models/index').contest;
const Contests_problems = require('../models/index').contests_problems;
const Contests_submissions = require('../models/index').contests_submissions;

/* GET contest list. */
router.get('/', function(req, res, next) {
	var active, passed;

	/* Active & Future Contests*/
	Contests.findAll({
		where: {status: {$not: 'finished'}}
	})
	.then(contest => active = contest)
	.catch(error => {throw error});

	/* Passed Contests*/
	Contests.findAll({
		where: {status: 'finished'}
	})
	.then(contest => passed = contest)
	.catch(error => {throw error});

	res.render('contest/index', {
		active_contests: active,
		passed_contests: passed
	});
})

/* GET speficied contest */
router.get('/:id', function(req, res, next) {
	const id = req.params.id;
	var contest, problems;

	/* The Contest */
	Contests.findOne({
		where: {id: id}
	})
	.then(contests => contest = contests.name)
	.catch(error => {throw error});

	/* Contest Problems */
	Contests_problems.findAll({
		where: {contest_id: id}
	})
	.then(contests_problems => problems = contests_problems)
	.catch(error => {throw error});

	res.render('contest/dashboard', {'contest': contest, 'problems' : problems});
});

/* GET standings of contest */
router.get('/:id/standings', function(req, res, next) {
	const id = req.params.id;
	var problem, users = [];

	/* Contest Problems */
	Contests_problems.findAll({
		where: {contest_id: id}
	})
	.then(contests_problems => problem = contests_problems)
	.catch(error => {throw error});

	/* Get User's score for each problem by Contest Submissions*/
	Contests_submissions.findAll({
		where: {contest_id: id}
	})
	.then(contests_submissions => {
		contests_submissions.forEach(row => {
			var current_score = users[row.submitter][row.problem_id];
			if(current_score < row.score){
				users[row.submitter][row.problem_id] = row.score;
			}
		});
	})
	.catch(error => {throw error});

	res.render('contest/standings', {
		problems: problems,
		users: users
	});
});

/* GET submissions of contest */
router.get('/:id/submissions', function(req, res, next) {
	const id = req.params.id;

	Contests_submissions.findAll({
		where: {contest_id: id}
	})
	.then(contests_submissions => res.render('contest/submissions', {'submissions' : contests_submissions}))
	.catch(error => {throw error});
});

/* GET speficied problem in contest */
router.get('/:cid/problem/:pid', function(req, res, next) {
	const id = req.params.id;

	Problems.findOne({
		where: {id: id}
	})
	.then(problem => res.render('contest/problem', problem))
	.catch(error => {throw error});
});

module.exports = router;