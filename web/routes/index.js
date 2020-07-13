const express = require('express');
var router = express.Router();

const User_info = require('../models/index').user_info;

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

	User_info.findOne({
		where: {
			username: username,
			password: password,
		}
	})
	.then(user_info => {
		if(!user_info){
			res.send('Login failed');
		}else{
			req.session.username = username;
			res.redirect('/');
		}
	})
	.catch(error => {throw error});
});



/* POST registe user */
router.post('/registes', function(req, res, next){
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	User_info.findOne({
		where: {username: username}
	})
	.then(user_info => {
		if(user_info){
			res.send('Username existed');
		}else{
			User_info.create({
				username: username,
				email: email,
				password: password,
			})
			.then(() => {
				require.session.username = username;
				redirect('/');
			})
			.catch(err => res.send(err));
		}
	})
	.catch(err => res.send(err));
});

module.exports = router;
