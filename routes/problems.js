const express = require('express');
var router = express.Router();


const mysql = require('mysql');
const connection = mysql.createConnection(global.DB_INFO);
connection.connect();

/* GET prblem set. */
router.get('/', function(req, res, next) {
	var cmd = 'SELECT * FROM problems';

	connection.query(cmd, function(err, rows, fields) {
		if(err) throw err;
		res.render('problem/index', {'problems' : rows});
	});
});

/* GET speficied problem */
router.get('/:id', function(req, res, next) {
	var cmd = 'SELECT * FROM problems WHERE id = ?';
	connection.query(cmd, [req.params.id], function(err, rows, fields) {
		if(err) throw err;
		res.render('problem/show', {
			problem : rows[0],
			examples: []
		});
	});
});

/* POST submit answer */
router.post('/:id', function(req, res, next) {
	if(req.session.username) {
	}
	else {
		res.redirect('/login');
	}
});

/* GET problem */
module.exports = router;
