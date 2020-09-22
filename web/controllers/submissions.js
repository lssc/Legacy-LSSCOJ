const Submission = require('../models/submission');

module.exports = {

  /* List all submissions */
  list(req, res, next) {
    Submission.find()
      .sort({ _id: 'desc' })
      .populate('submitter')
      .populate('problem')
      .exec((err, submissions) => {
        if (err) throw err;
        req.submissions = submissions;
        next();
      });
  },

  /* Find one submission */
  retrieve(req, res, next) {
    Submission.findOne({
      _id: req.params.submission_id,
    })
      .populate('submitter')
      .populate('problem')
      .exec((err, submission) => {
        if (err) throw err;
        req.submission = submission;
        next();
      });
  },
  /* Add a submission */
  add(req, res, next) {
    if (!req.isLogin) {
      res.redirect('/login');
    } else {
      const submission = new Submission({
        problem: req.params.problem_id,
        contest: req.session.user.current_contest_id || null,
        submitter: req.session.user._id,
        code: req.body.content,
        language: req.body.language, // C, C++, Java, Python
      });
      submission.save();
      req.submission = submission;
      next();
    }
  },
};
