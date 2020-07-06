const express = require('express');
var router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection(global.DB_INFO);
connection.connect();

/* GET submission list. */
router.get('/', function(req, res, next) {
	var cmd = 'SELECT * FROM submissions';
	connection.query(cmd, function(err, rows, fields) {
		if(err) throw err;
		res.render('submission/index', {submissions : rows});
	})
});

/* GET submission detail */
router.get('/:id', function(req, res, next ) {
	var cmd = 'SELECT * FROM submissions WHERE id = ?';
	connection.query(cmd, [req.params.id], function(err, rows, fields) {
		if(err) throw err;
		res.render('submission/show');
	});
});

module.exports = router;
