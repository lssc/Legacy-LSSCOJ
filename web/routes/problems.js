const express = require('express');
const mysql = require('mysql');

const router = express.Router();
const connection = mysql.createConnection(global.DB_INFO);
connection.connect();

/* GET prblem set. */
router.get('/', (req, res) => {
  const cmd = 'SELECT * FROM problems';

  connection.query(cmd, (err, rows) => {
    if (err) throw err;
    res.render('problem/index', { problems: rows });
  });
});

/* GET speficied problem */
router.get('/:id', (req, res) => {
  const cmd = 'SELECT * FROM problems WHERE id = ?';
  connection.query(cmd, [req.params.id], (err, rows) => {
    if (err) throw err;
    res.render('problem/show', {
      problem: rows[0],
      examples: [],
    });
  });
});

/* POST submit answer */
router.post('/:id', (req, res) => {
  if (req.session.username) {
  } else {
    res.redirect('/login');
  }
});

/* GET problem */
module.exports = router;
