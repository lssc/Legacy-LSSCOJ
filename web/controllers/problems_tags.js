const ProblemsTags = require('../models/index').problems_tags;

module.exports = {

  /* List all problems' tags */
  list(req, res, next) {
    ProblemsTags.findAll({
      where: { problem_id: req.params.problem_id },
    })
      .then((tags) => {
        req.problem_tags = tags;
        next();
      })
      .catch((err) => { throw err; });
  },
  /* Add a tag to problem */
  /* You should check permissions first before modify. */
  add(req, res, next) {
    ProblemsTags.create({
      problem_id: req.params.problem_id,
      tag: req.body.tag,
    })
      .then((tag) => {
        req.problem_tag = tag;
        next();
      })
      .catch((err) => { throw err; });
  },
  /* Remove a tag from problem */
  /* You should check permissions first before modify. */
  remove(req, res, next) {
    ProblemsTags.findOne({
      where: {
        problem_id: req.params.problem_id,
        tag: req.params.tag,
      },
    })
      .then((existTag) => {
        if (!existTag) {
          res.send('Tag unexisted');
        } else {
          existTag.destroy()
            .then(() => next())
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => { throw err; });
  },
};
