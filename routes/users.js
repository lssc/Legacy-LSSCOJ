const express = require('express');
var router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection(global.DB_INFO);
connection.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var cmd = 'SELECT * FROM user_info';
	connection.query(cmd, function(err, rows, fields) {
		if(err) throw err;
		res.render('user/rating', {'users' : rows});
	});
});

/* GET user profile */
router.get('/:id', function(req, res, next ) {
	var cmd = 'SELECT * FROM user_info WHERE id= ?';
	connection.query(cmd, [req.params.id], function(err, rows, fields) {
		if(err) throw err;
		res.render('user/profile', {profile: rows[0]});
	});
});

module.exports = router;
