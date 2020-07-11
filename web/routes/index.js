const express = require('express');
const mysql = require('mysql');

const router = express.Router();
const connection = mysql.createConnection(global.DB_INFO);
connection.connect();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

/* GET login & register page */
router.get('/login', (req, res) => {
  res.render('login');
});

/* POST login user */
router.post('/login', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  const cmd = 'SELECT * FROM user_info WHERE username=? AND password=?';
  connection.query(cmd, [username, password], (err, rows) => {
    if (err) throw err;
    if (rows.length === 1) {
      req.session.username = username;
      res.redirect('/');
    } else {
      res.send('Login failed');
    }
  });
});

/* POST registe user */
router.post('/registes', (req, res) => {
  const { username } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  const cmd1 = 'SELECT * FROM user_info WHERE username = ?';
  connection.query(cmd1, [username], (err, rows) => {
    if (err) throw err;
    if (rows.length !== 0) {
      res.send('Username existed');
    } else {
      const cmd2 = 'INSERT INTO user_info (username, email, password) VALUES (?,?,?)';
      connection.query(cmd2, [username, email, password], (err2) => {
        if (err2) throw err2;
        req.session.username = username;
        res.redirect('/');
      });
    }
  });
});

module.exports = router;
