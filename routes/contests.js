const express = require('express');
var router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection(global.DB_INFO);
connection.connect();

/* GET contest list. */
router.get('/', function(req, res, next) {
	var cmd = 'SELECT * FROM contests WHERE status!="finished";';
	cmd += 'SELECT * FROM contests WHERE status="finished";';
	
	connection.query(cmd, function(err, rows, fields) {
		if(err) throw err;
		var active = rows[0];
		var passed = rows[1]

		res.render('contest/index', {
			active_contests: active,
			passed_contests: passed
		});
	});
})

/* GET speficied contest */
router.get('/:id', function(req, res, next) {
	var cmd = 'SELECT * FROM contests WHERE id = ?;';
	cmd += 'SELECT * FROM contests_problems WHERE contest_id = ?;';
	
	const id = req.params.id;
	connection.query(cmd, [id, id], function(err, rows, fields) {
		if(err) throw err;
		var contest = rows[0][0];
		var problems = rows[1];

		res.render('contest/dashboard', {'contest': contest, 'problems' : problems});
	});
});

/* GET standings of contest */
router.get('/:id/standings', function(req, res, next) {
	var cmd = 'SELECT * FROM contests_problems WHERE contest_id = ?;';
	cmd += 'SELECT * FROM contests_submissions WHERE contest_id = ?;';

	const id = req.params.id;
	connection.query(cmd, [id,id], function(err, rows, fields) {
		if(err) throw err;
		var users = [];
		rows[1].forEach(row => {
			var current_score = users[row.submitter][row.problem_id];
			if(current_score < row.score){
				users[row.submitter][row.problem_id] = row.score;
			}
		});

		res.render('contest/standings', {
			problems: rows[0],
			users: users
		});
	});
});

/* GET submissions of contest */
router.get('/:id/submissions', function(req, res, next) {
	var cmd = 'SELECT * FROM contests_submissions WHERE contest_id = ?';
	connection.query(cmd, [req.params.id], function(err, rows, fields) { 
		res.render('contest/submissions', {'submissions' : rows});
	})
});

/* GET speficied problem in contest */
router.get('/:cid/problem/:pid', function(req, res, next) {
	var cmd = 'SELECT * FROM problems WHERE id = ?';
	connection.query(cmd, [req.params.pid], function(err, rows, fields) {
		res.render('contest/problem', rows[0]);
	});
});

module.exports = router;