const ProblemsSamples = require('../models/index').problems_samples;

module.exports = {

  /* List all problem samples */
  list(req, res, next) {
    ProblemsSamples.findAll({
      where: { problem_id: req.params.problem_id },
    })
      .then((samples) => {
        req.problem_samples = samples;
        next();
      })
      .catch((err) => { throw err; });
  },
  /* Add a sample for the problem */
  add(req, res, next) {
    ProblemsSamples.create({
      problem_id: req.params.problem_id,
      input: req.body.input,
      output: req.body.output,
    })
      .then((sample) => {
        req.problem_sample = sample;
        next();
      })
      .catch((err) => { throw err; });
  },
  /* Modify a problem sample */
  /* You should check permissions first before modify. */
  modify(req, res, next) {
    ProblemsSamples.findOne({
      where: {
        id: req.params.sample_id,
        problem_id: req.params.problem_id,
      },
    })
      .then((existSample) => {
        if (!existSample) {
          res.send('Sample for the problem is not exist!');
        } else {
          existSample.update({
            input: req.body.input || existSample.input,
            output: req.body.output || existSample.output,
          })
            .then((sample) => {
              req.problem_sample = sample;
              next();
            })
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => { throw err; });
  },

  /* Remove a problem sample */
  /* You should check permissions first before remove. */
  remove(req, res, next) {
    ProblemsSamples.findOne({
      where: {
        id: req.params.sample_id,
        problem_id: req.params.problem_id,
      },
    })
      .then((existSample) => {
        if (!existSample) {
          res.send('Sample for the problem is not exist!');
        } else {
          existSample.destroy()
            .then(() => next())
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => { throw err; });
  },
};
