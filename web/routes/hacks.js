const express = require('express');
var router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection(global.DB_INFO);
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
    var cmd = 'SELECT * FROM hacks';

    connection.query(cmd, function(err, rows, fields) {
        if(err) throw err;
        res.render('hack/index', {hacks : rows});
    });
});

/* GET speficied hack */
router.get('/:id', function(req, res, next) {
    res.render('hack/show');
});

module.exports = router;
