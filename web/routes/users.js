const express = require('express');
const mysql = require('mysql');

const router = express.Router();
const connection = mysql.createConnection(global.DB_INFO);
connection.connect();

/* GET users listing. */
router.get('/', (req, res) => {
  const cmd = 'SELECT * FROM user_info';
  connection.query(cmd, (err, rows) => {
    if (err) throw err;
    res.render('user/rating', { users: rows });
  });
});

/* GET user profile */
router.get('/:id', (req, res) => {
  const cmd = 'SELECT * FROM user_info WHERE id= ?';
  connection.query(cmd, [req.params.id], (err, rows) => {
    if (err) throw err;
    res.render('user/profile', { profile: rows[0] });
  });
});

module.exports = router;
