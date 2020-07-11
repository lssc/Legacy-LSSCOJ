const express = require('express');
const mysql = require('mysql');

const router = express.Router();
const connection = mysql.createConnection(global.DB_INFO);
connection.connect();

/* GET submission list. */
router.get('/', (req, res) => {
  const cmd = 'SELECT * FROM submissions';
  connection.query(cmd, (err, rows) => {
    if (err) throw err;
    res.render('submission/index', { submissions: rows });
  });
});

/* GET submission detail */
router.get('/:id', (req, res) => {
  const cmd = 'SELECT * FROM submissions WHERE id = ?';
  connection.query(cmd, [req.params.id], (err, rows) => {
    if (err) throw err;
    res.render('submission/show', { submission: rows[0] });
  });
});

module.exports = router;
