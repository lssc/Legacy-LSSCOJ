const Contest = require('../models/contest');

module.exports = {
  /* List all contests */
  list(req, res, next) {
    /* Current & Upcoming contests */
    const futureContests = Contest.find(
      {
        status: { $ne: 'FINISHED' },
      },
    ).exec();
    /* Ended contests */
    const passedContests = Contest.find({
      status: 'FINISHED',
    }).exec();

    Promise.all([futureContests, passedContests])
      .then(([future, passed]) => {
        req.futureContests = future;
        req.passedContests = passed;
        next();
      })
      .catch((error) => { throw error; });
  },
  /* Find one contest */
  retrieve(req, res, next) {
    Contest.findOne({
      _id: req.params.contest_id,
    })
      .populate('problem')
      .populate('manager')
      .populate('registrant')
      .exec((err, contest) => {
        if (err) throw err;
        req.contest = contest;
        next();
      });
  },
  /* Add a contest */
  /* Remember to add permission */
  add(req, res, next) {
    const contest = new Contest({
      name: req.body.name,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      status: 'pending',
    });
    contest.save();
    req.contest = contest;
    next();
  },
  /* Modify contest information */
  /* You should check permissions first before modify. */
  modify(req, res, next) {
    Contest.findOne({
      _id: req.params.contest_id,
    }).exec((err, contest) => {
      if (err) throw err;

      if (!req.contest_permission) {
        res.send('You do not have permission to modify the contest!');
      } else {
        // Auto update status
        const startTime = req.body.start_time || contest.start_time;
        const lastMin = req.body.last_min || contest.last_min;
        let currentStatus = '';
        if (Date.now() < startTime) {
          currentStatus = 'pending';
        } else if (startTime <= Date.now() && Date.now() < lastMin) {
          currentStatus = 'started';
        } else {
          currentStatus = 'finished';
        }
        contest.update({
          name: req.body.name || contest.name,
          start_time: startTime,
          last_min: lastMin,
          status: currentStatus,
        });
        req.contest = contest;
        next();
      }
    });
  },
  /* Remove a contest */
  /* You should check permissions first before remove. */
  remove(req, res, next) {
    Contest.deleteOne({
      _id: req.params.contest_id,
    }).exec((err) => {
      if (err) throw err;
      next();
    });
  },
};
