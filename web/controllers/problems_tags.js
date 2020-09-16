const ProblemTag = require('../models/problem_tag');

module.exports = {

  /* List all problems' tags */
  list(req, res, next) {
    ProblemTag.find({
      problem: req.params.problem_id,
    }).exec((err, tags) => {
      if (err) throw err;
      req.problem_tags = tags;
      next();
    });
  },
  /* Add a tag to problem */
  /* You should check permissions first before modify. */
  add(req, res, next) {
    const tag = new ProblemTag({
      problem: req.params.problem_id,
      tag: req.body.tag,
    });
    tag.save();
    req.problem_tag = tag;
    next();
  },
  /* Remove a tag from problem */
  /* You should check permissions first before modify. */
  remove(req, res, next) {
    ProblemTag.deleteOne({
      _id: req.params.tag_id,
    }).exec((err) => {
      if (err) throw err;
      next();
    });
  },
};
