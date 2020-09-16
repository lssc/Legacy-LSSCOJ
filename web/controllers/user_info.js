const UserInfo = require('../models/user_info');

module.exports = {

  /* List all users */
  list(req, res, next) {
    UserInfo.find()
      .exec((err, users) => {
        if (err) throw err;
        req.users = users;
        next();
      });
  },

  /* Get the user's detail */
  async retrieve(req, res, next) {
    const ret = UserInfo.findOne({
      _id: req.params.id,
    }).exec((err, user) => {
      if (err) throw err;
      req.user = user;
      if (next) next();
      return user;
    });
    return ret;
  },

  /* Login */
  login(req, res, next) {
    UserInfo.findOne({
      username: req.body.username,
      password: req.body.password,
    }).exec((err, user) => {
      if (err) throw err;
      if (user) {
        req.isLogin = true;
        req.session.user = user;
        next();
      } else {
        res.send('Login failed!');
      }
    });
  },

  logout(req, res, next) {
    req.session.user = undefined;
    req.isAdmin = false;
    req.isLogin = false;
    next();
  },

  /* Add a user account */
  register(req, res, next) {
    const user = new UserInfo({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      ac_num: 0,
    });
    user.save();

    req.session.user = user;
    next();
  },

  /* Modify user information */
  modify(req, res, next) {
    if (!req.isLogin) {
      res.redirect('/login');
    } else {
      UserInfo.findOne({
        _id: req.session.user.id,
      }).exec((err, user) => {
        if (err) throw err;
        if (req.body.password !== '' && user.password !== req.body.old_password) {
          res.send('Old Password Incorrect!');
        } else {
          const newPassword = (req.body.password === '') ? user.password : req.body.password;
          user.username = req.body.username || user.username;
          user.password = newPassword;
          user.save();

          req.user = user;
        }
      });
    }
  },

  /* Remove a user account */
  remove(req, res, next) {
    const { _id } = req.session.user;
    UserInfo.deleteOne({ _id }, (err) => {
      if (err) throw err;
      res.redirect('/login');
    });
  },
};
