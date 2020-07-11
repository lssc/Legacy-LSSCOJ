const express = require('express');
const mysql = require('mysql');

const router = express.Router();
const connection = mysql.createConnection(global.DB_INFO);
connection.connect();

/* GET contest list. */
router.get('/', (req, res) => {
  let cmd = 'SELECT * FROM contests WHERE status!="finished";';
  cmd += 'SELECT * FROM contests WHERE status="finished";';

  connection.query(cmd, (err, rows) => {
    if (err) throw err;
    const active = rows[0];
    const passed = rows[1];

    res.render('contest/index', {
      active_contests: active,
      passed_contests: passed,
    });
  });
});

/* GET speficied contest */
router.get('/:id', (req, res) => {
  let cmd = 'SELECT * FROM contests WHERE id = ?;';
  cmd += 'SELECT * FROM contests_problems WHERE contest_id = ?;';

  const { id } = req.params;
  connection.query(cmd, [id, id], (err, rows) => {
    if (err) throw err;
    const contest = rows[0][0];
    const problems = rows[1];

    res.render('contest/dashboard', { contest, problems });
  });
});

/* GET standings of contest */
router.get('/:id/standings', (req, res) => {
  let cmd = 'SELECT * FROM contests_problems WHERE contest_id = ?;';
  cmd += 'SELECT * FROM contests_submissions WHERE contest_id = ?;';

  const { id } = req.params;
  connection.query(cmd, [id, id], (err, rows) => {
    if (err) throw err;
    const users = [];
    rows[1].forEach((row) => {
      const currentScore = users[row.submitter][row.problem_id];
      if (currentScore < row.score) {
        users[row.submitter][row.problem_id] = row.score;
      }
    });

    res.render('contest/standings', {
      problems: rows[0],
      users,
    });
  });
});

/* GET submissions of contest */
router.get('/:id/submissions', (req, res) => {
  const cmd = 'SELECT * FROM contests_submissions WHERE contest_id = ?';
  connection.query(cmd, [req.params.id], (err, rows) => {
    if (err) throw err;
    res.render('contest/submissions', { submissions: rows });
  });
});

/* GET speficied problem in contest */
router.get('/:cid/problem/:pid', (req, res) => {
  const cmd = 'SELECT * FROM problems WHERE id = ?';
  connection.query(cmd, [req.params.pid], (err, rows) => {
    if (err) throw err;
    res.render('contest/problem', rows[0]);
  });
});

module.exports = router;
