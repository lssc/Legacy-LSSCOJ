var express = require('express');
var router = express.Router();
var connection = mysql.createConnection(DB_INFO);

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
  res.send('OK');
});

/* POST registe user */
router.post('/registes', function(req, res,next) {
  res.send('OK');
});

module.exports = router;
