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
    ProblemsSamples.findOne({
      where: {
        problem_id: req.params.problem_id,
        order: req.body.order,
      },
    })
      .then((existSample) => {
        if (existSample) {
          res.send('Sample with this orrder has already exist!');
        } else if (!req.problem_permission) {
          res.send('You do not have permission to remove user from permission!');
        } else {
          ProblemsSamples.create({
            problem_id: req.params.problem_id,
            order: req.body.order,
            input: req.body.input,
            output: req.body.output,
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
  /* Modify a problem sample */
  /* You should check permissions first before modify. */
  modify(req, res, next) {
    ProblemsSamples.findOne({
      where: {
        problem_id: req.params.problem_id,
        order: req.params.order,
      },
    })
      .then((existSample) => {
        if (!existSample)res.send('Sample for the problem is not exist!');
        else if (!req.problem_permission) {
          res.send('You do not have permission to modify the sample!');
        } else {
          existSample.update({
            input: req.body.input || existSample.output,
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
        if (!existSample)res.send('Sample for the problem is not exist!');
        else if (!req.problem_permission) {
          res.send('You do not have permission to remove the sample!');
        } else {
          existSample.delete()
            .then(() => next())
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => { throw err; });
  },
};
