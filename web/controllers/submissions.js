const Submissions = require('../models/index').submissions;

module.exports = {

  /* List all submissions */
  list(req, res, next) {
    Submissions.findAll({
      order: [['id', 'DESC']],
    })
      .then((submissions) => {
        req.submissions = submissions;
        next();
      })
      .catch((err) => { throw err; });
  },
  /* Find one submission */
  retrieve(req, res, next) {
    Submissions.findOne({
      where: { id: req.params.submission_id },
    })
      .then((submission) => {
        req.submission = submission;
        next();
      })
      .catch((err) => { throw err; });
  },
  /* Add a submission */
  add(req, res, next) {
    if (!req.isLogin) {
      res.redirect('/login');
    } else {
      Submissions.create({
        problem_id: req.params.problem_id,
        contest_id: req.session.user.current_contest_id || null,
        submit_time: Date.now(),
        submitter_id: req.session.user.id,
        content: req.body.content,
        language: req.body.language, // C, C++, Java, Python
        tot_size: req.body.content.length,
        result: 'Unknown',
        status: 'Pending',
        is_hidden: 0,
        status_details: '',
      })
        .then((submission) => {
          // judge
          req.submission = submission;
          next();
        })
        .catch((err) => { throw err; });
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
      Submissions.findOne({
        where: { id: req.params.submission_id },
      })
        .then((existSubmission) => {
          if (!existSubmission) {
            res.send('Submission not exist!');
          } else {
            existSubmission.destroy()
              .then(() => next())
              .catch((err) => { throw err; });
          }
        })
        .catch((err) => { throw err; });
    }
  },
};
