const Contests = require('../models/index').contests;

module.exports = {
  /* List all contests */
  list(req, res, next) {
    /* Current & Upcoming contests */
    const contests = Contests.findAll({
      exclude: [
        {
          where: { status: 'finished' },
        },
      ],
    });
    /* Ended contests */
    const contests2 = Contests.findAll({
      where: { status: 'finished' },
    });

    Promise.all([contests, contests2])
      .then(([active, passed]) => {
        req.contests = {};
        req.contests.active = active;
        req.contests.passed = passed;
        next();
      })
      .catch((error) => { throw error; });
  },
  /* Find one contest */
  retrieve(req, res, next) {
    Contests.findOne({
      where: { id: req.params.contest_id },
    })
      .then((contest) => {
        if (contest)req.contest = contest;
        next();
      })
      .catch((err) => { throw err; });
  },
  /* Add a contest */
  /* Remember to add permission */
  add(req, res, next) {
    Contests.create({
      name: req.body.name,
      start_time: req.body.start_time,
      last_min: req.body.last_min,
      player_num: 0,
      status: 'pending',
      extra_config: '',
      zan: 0,
    })
      .then((contest) => {
        if (contest)req.contest = contest;
        next();
      })
      .catch((err) => { throw err; });
  },
  /* Modify contest information */
  /* You should check permissions first before modify. */
  modify(req, res, next) {
    Contests.findOne({
      where: { id: req.params.contest_id },
    })
      .then((existContest) => {
        if (!existContest) {
          res.send('Contest is not exist!');
        } else if (!req.contest_permission) {
          res.send('You do not have permission to modify the contest!');
        } else {
          // Auto update status
          let currentStatus = '';
          const startTime = req.body.start_time || existContest.start_time;
          const lastMin = req.body.last_min || existContest.last_min;
          if (Date.now() < startTime) {
            currentStatus = 'pending';
          } else if (startTime <= Date.now() && Date.now() < lastMin) {
            currentStatus = 'started';
          } else {
            currentStatus = 'finished';
          }
          existContest.update({
            name: req.body.name || existContest.name,
            start_time: startTime,
            last_min: lastMin,
            player_num: existContest.player_num,
            status: currentStatus,
            extra_config: '',
            zan: 0,
          })
            .then((contest) => {
              if (contest)req.contest = contest;
              next();
            })
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => { throw err; });
  },
  /* Remove a contest */
  /* You should check permissions first before remove. */
  remove(req, res, next) {
    Contests.findOne({
      where: { id: req.params.contest_id },
    })
      .then((existContest) => {
        if (!existContest) {
          res.send('Contest is not exist!');
        } else if (!req.contest_permission) {
          res.send('You do not have permission to remove the contest!');
        } else {
          existContest.destroy()
            .then(() => {
              next();
            })
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => { throw err; });
  },
};
