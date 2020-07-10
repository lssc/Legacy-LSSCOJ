const express = require('express');
var router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection(global.DB_INFO);
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET login & register page */
router.get('/login', function(req, res, next ) {
  res.render('login');
});

/* POST login user */
router.post('/login', function(req, res, next) {
	const username = req.body.username;
	const password = req.body.password;

	var cmd = 'SELECT * FROM user_info WHERE username=? AND password=?';
	connection.query(cmd, [username, password], function(err, rows, fields) {
		if(err) throw err;
		if(rows.length == 1) {
			req.session.username = username;
			res.redirect('/');
		}
		else {
			res.send('Login failed');
		}
	});
});

/* POST registe user */
router.post('/registes', function(req, res, next) {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	var cmd = 'SELECT * FROM user_info WHERE username = ?';
	connection.query(cmd, [username], function(err, rows, fields) {
		if(err) throw err;
		if(rows.length != 0) {
			res.send('Username existed');
		}
		else {
			var cmd = 'INSERT INTO user_info (username, email, password) VALUES (?,?,?)';
			connection.query(cmd, [username, email, password], function(err, row, fields) {
				req.session.username = username;
				res.redirect('/');
			});
		}
	});
});

module.exports = router;
