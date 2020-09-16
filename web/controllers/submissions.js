const Submission = require('../models/submission');

module.exports = {

  /* List all submissions */
  list(req, res, next) {
    Submission.find()
      .sort({ _id: 'desc' })
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
  /* Remove a submission */
  /* You should check permissions first before modify. */
  remove(req, res, next) {
    if (!req.isAdmin) {
      res.send('You are not admin!\nYou cannot remove the submission.');
    } else if (!req.isLogin) {
      res.redirect('/login');
    } else {
      Submission.deleteOne({ _id: req.params.submission_id })
        .exec((err) => {
          if (err) throw err;
          next();
        });
    }
  },
};
