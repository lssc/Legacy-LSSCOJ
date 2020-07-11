const express = require('express');
const mysql = require('mysql');

const router = express.Router();
const connection = mysql.createConnection(global.DB_INFO);
connection.connect();

/* GET home page. */
router.get('/', (req, res) => {
  const cmd = 'SELECT * FROM hacks';

  connection.query(cmd, (err, rows) => {
    if (err) throw err;
    res.render('hack/index', { hacks: rows });
  });
});

/* GET speficied hack */
router.get('/:id', (req, res) => {
  res.render('hack/show');
});

module.exports = router;
