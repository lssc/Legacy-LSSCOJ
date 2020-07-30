const Problems = require('../models/index').problems;

module.exports = {

  /* List all problems */
  list(req, res, next) {
    Problems.findAll()
      .then((problems) => {
        req.problems = problems;
        console.log(problems);
        next();
      })
      .catch((err) => { throw err; });
  },
  /* Find one problem */
  retrieve(req, res, next) {
    Problems.findOne({
      where: { id: req.params.problem_id },
    })
      .then((problem) => {
        if (problem)req.problem = problem;
        next();
      })
      .catch((err) => { throw err; });
  },
  /* Add a problem */
  /* Remember to add permission */
  add(req, res, next) {
    Problems.create({
      title: req.body.title,
      statement: req.body.statement,
      hint: req.body.hint,
    })
      .then((problem) => {
        req.problem = problem;
        next();
      })
      .catch((err) => { throw err; });
  },
  /* Modify a problem */
  /* You should check permissions first before modify. */
  modify(req, res, next) {
    Problems.findOne({
      where: { id: req.params.problem_id },
    })
      .then((existProblem) => {
        if (!existProblem) {
          res.send('Problem is not exist!');
        } else if (!req.problem_permission) {
          res.send('You do not have permission to modify the problem!');
        } else {
          existProblem.update({
            title: req.body.title || existProblem.title,
            statement: req.body.statement || existProblem.statement,
            hint: req.body.hint || existProblem.hint,
          })
            .then((problem) => {
              req.problem = problem;
              next();
            })
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => { throw err; });
  },
  /* Remove a problem */
  /* You should check permissions first before modify. */
  remove(req, res, next) {
    Problems.findOne({
      where: { id: req.params.problem_id },
    })
      .then((existProblem) => {
        if (!existProblem) {
          res.send('Problem is not exist!');
        } else if (!req.problem_permission) {
          res.send('You do not have permission to delete the problem!');
        } else {
          existProblem.delete()
            .then(() => next())
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => { throw err; });
  },
};