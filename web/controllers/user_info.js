const UserInfo = require('../models/index').user_info;

module.exports = {
  /* List all users */
  list(req, res, next) {
    UserInfo.findAll()
      .then((users) => {
        req.users = users;
        next();
      })
      .catch((err) => { throw err; });
  },

  /* Get the user's detail */
  retrieve(req, res, next) {
    UserInfo.findOne({
      where: { id: req.params.user_id },
    })
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => { throw err; });
  },

  /* Add a user account */
  add(req, res, next) {
    UserInfo.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      ac_num: 0,
    })
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => { throw err; });
  },

  /* Modify user information */
  modify(req, res, next) {
    UserInfo.findOne({
      where: { id: req.params.id },
    })
      .then((existUser) => {
        if (!existUser) {
          res.send('User not exist!');
        } else if (existUser.id !== req.cookies.user_id) {
          res.send('You cannot modify other person\'s informations!!!');
        } else {
          existUser.update({
            username: req.body.username || existUser.username,
            password: req.body.password || existUser.password,
          })
            .then((user) => {
              req.user = user;
              next();
            })
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => { throw err; });
  },

  /* Remove a user account */
  remove(req, res, next) {
    UserInfo.findOne({
      where: { id: req.params.id },
    })
      .then((existUser) => {
        if (!existUser) {
          res.send('User not exist!');
        } else if (existUser.id !== req.cookies.user_id) {
          res.send('You cannot modify other person\'s informations!!!');
        } else {
          existUser.update()
            .then(() => next())
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => { throw err; });
  },
};
