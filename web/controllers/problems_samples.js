const ProblemSample = require('../models/problem_sample');

module.exports = {

  /* List all problem samples */
  list(req, res, next) {
    ProblemSample.find({
      problem: req.params.problem_id,
    }).exec((err, samples) => {
      if (err) throw err;
      req.problem_samples = samples;
      next();
    });
  },
  /* Add a sample for the problem */
  add(req, res, next) {
    const sample = new ProblemSample({
      problem: req.params.problem_id,
      input: req.body.input,
      output: req.body.output,
    });
    sample.save();
    req.problem_samples = sample;
    next();
  },
  /* Modify a problem sample */
  /* You should check permissions first before modify. */
  modify(req, res, next) {
    ProblemSample.findOne({
      _id: req.params.sample_id,
    }).exec((err, sample) => {
      if (err) throw err;
      sample.input = req.body.input || sample.input;
      sample.ouput = req.body.output || sample.output;
      sample.save();

      req.problem_sample = sample;
      next();
    });
  },

  /* Remove a problem sample */
  /* You should check permissions first before remove. */
  remove(req, res, next) {
    ProblemSample.deleteOne({
      _id: req.params.sample_id,
    }).exec((err) => {
      if (err) throw err;
      next();
    });
  },
};
