const Submissions = require('../models/index').submissions;

module.exports = {

  /* List all submissions */
  list(req, res, next) {
    Submissions.findAll({
      order: ['id', 'DESC'],
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
    Submissions.create({
      problem_id: req.params.problem_id,
      contest: req.cookies.username,
      submit_time: Date.now(),
      submitter_id: req.cookies.user_id,
      content: req.body.content,
      language: 'C++',
      tot_size: req.content.length,
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
  },
  /* Rejudge a submission */
  /* You should check permissions first before rejudge. */
  rejudge(req, res, next) {
    /* if(!req.isAdmin){
            res.send('You are not admin!\nYou cannot do this operation.');
        } */
    Submissions.findOne({
      where: { id: req.params.submission_id },
    })
      .then((existSubmission) => {
        existSubmission.update({
          submit_time: Date.now(),
          result: 'Unknown',
          status: 'Pending',
          status_details: '',
        })
          .then((submission) => {
            // judge
            req.submission = submission;
            next();
          })
          .catch((err) => { throw err; });
      })
      .catch((err) => { throw err; });
  },
  /* Remove a submission */
  /* You should check permissions first before modify. */
  remove(req, res, next) {
    /* if(!req.isAdmin){
            res.send('You are not admin!\nYou cannot do this operation.');
        } */
    Submissions.findOne({
      where: { id: req.params.submission_id },
    })
      .then((existSubmission) => {
        if (!existSubmission) {
          res.send('Submission not exist!');
        } else {
          existSubmission.delete()
            .then(() => next())
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => { throw err; });
  },
};
