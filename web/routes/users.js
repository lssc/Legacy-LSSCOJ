const express = require('express');
var router = express.Router();

const User_info = require('../models/index').user_info;

/* GET users listing. */
router.get('/', function(req, res, next) {
	User_info.findAll()
	.then(users => res.render('user/rating', {'users' : users}))
	.catch(error => {throw error});
});

/* GET user profile */
router.get('/:id', function(req, res, next ) {
	const id = req.params.id;

	User_info.findOne({
		where: {id: id}
	})
	.then(user => res.render('user/profile', {profile: user}))
	.catch(error => {throw error});
});

module.exports = router;
