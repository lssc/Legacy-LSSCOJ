const express = require('express');
var router = express.Router();

const Contests = require('../models/index').contests;
const Contests_problems = require('../models/index').contests_problems;
const Contests_submissions = require('../models/index').contests_submissions;

/* GET contest list. */
router.get('/', function(req, res, next) {

	/* Current & Upcoming contests */
	const active = Contests.findAll({
		exclude: [
			{
				where: {status: 'finished'}
			}
		]
	});
	
	/* Ended contests */
	const passed = Contests.findAll({
		where: {status: 'finished'}
	})

	Promise.all([active, passed]).then(([active, passed]) => {
		res.render('contest/index', {
			active_contests: active,
			passed_contests: passed
		});
	})
	.catch(error => {throw error});
})

/* GET speficied contest */
router.get('/:id', function(req, res, next) {
	const id = req.params.id;

	/* The Contest */
	const contest = Contests.findOne({
		where: {id: id}
	})

	/* Contest Problems */
	const problems = Contests_problems.findAll({
		where: {contest_id: id}
	})
	
	Promise.all([contest, problems]).then(([contest, problems]) => {
		res.render('contest/dashboard', {
			'contest': contest,
			'problems' : problems
		});
	})
	.catch(error => {throw error});
});

/* GET standings of contest */
router.get('/:id/standings', function(req, res, next) {
	const id = req.params.id;

	/* Contest Problems */
	const problem = Contests_problems.findAll({
		where: {contest_id: id}
	})

	/* Get User's score for each problem by Contest Submissions */
	const contests_submissions = Contests_submissions.findAll({
		where: {contest_id: id}
	})

	Promise.all([problem, contests_submissions]).then(([problem, contests_submissions]) => {
		var users = [];

		contests_submissions.forEach(row => {
			var current_score = users[row.submitter][row.problem_id];
			if(current_score < row.score){
				users[row.submitter][row.problem_id] = row.score;
			}
		});

		res.render('contest/standings', {
			problems: problems,
			users: users
		});
	})
	.catch(error => {throw error});
});

/* GET submissions of contest */
router.get('/:id/submissions', function(req, res, next) {
	const id = req.params.id;

	Contests_submissions.findAll({
		where: {contest_id: id}
	})
	.then(contests_submissions => {
		res.render('contest/submissions', {
			'submissions' : contests_submissions
		});
	})
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