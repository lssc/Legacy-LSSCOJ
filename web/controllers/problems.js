const Problem = require('../models/problem');

module.exports = {

  /* List all problems */
  list(req, res, next) {
    Problem.find()
      .exec((err, problems) => {
        if (err) throw err;
        req.problems = problems;
        next();
      });
  },
  /* Find one problem */
  async retrieve(req, res, next) {
    const ret = Problem.findOne({
      _id: req.params.problem_id,
    }).exec((err, problem) => {
      req.problem = problem;
      if (next) next();
      return problem;
    });
    return ret;
  },
  /* Add a problem */
  /* Remember to add permission */
  async add(req, res, next) {
    const problem = new Problem({
      title: req.body.title,
      statement: req.body.statement,
      input_description: req.body.input,
      output_description: req.body.output,
      hint: req.body.hint,
    });
    await problem.save();
    req.problem = problem;
    next();
  },
  /* Modify a problem */
  /* You should check permissions first before modify. */
  modify(req, res, next) {
    Problem.findOne({
      _id: req.params.problem_id,
    }).exec((err, problem) => {
      if (err) throw err;
      if (!problem) {
        res.send('Problem is not exist!');
      } else {
        problem.title = req.body.title || problem.title,
        problem.statement = req.body.statement || problem.statement,
        problem.input_description = req.body.input || problem.input_description,
        problem.output_description = req.body.output || problem.output_description,
        problem.hint = req.body.hint || problem.hint,
        problem.save();

        req.problem = problem;
        next();
      }
    })
      .catch((err) => { throw err; });
  },
  /* Remove a problem */
  /* You should check permissions first before modify. */
  remove(req, res, next) {
    Problem.deleteOne({
      id: req.params.problem_id,
    }).exec((err) => {
      if (err) throw err;
      next();
    });
  },
  /** Check if a user is editor */
  checkEditor(req, res, next) {
    Problem.findOne({
      _id: req.params.problem_id || req.problem_id,
      editors: { $in: req.params.user_id },
    }).exec((err) => {
      if (err) throw err;
      next();
    });
  },
  /* Add a user to editor */
  addEditor(req, res, next) {
    Problem.findOne({
      _id: req.params.problem_id || req.problem._id,
    }).exec((err, problem) => {
      if (err) throw err;
      problem.editors.push(req.params.user_id);
      problem.save();

      next();
    });
  },

  /* Remove a user from editor */
  /* You should check permissions first before remove. */
  removeEditor(req, res, next) {
    Problem.findOne({
      _id: req.params.problem_id || req.problem._id,
    }).exec((err, problem) => {
      if (err) throw err;
      problem.editor.pull(req.params.user_id);
      next();
    });
  },
};
