const UserInfo = require('../models/user_info');

module.exports = {

  /* List all admin users */
  list(req, res, next) {
    UserInfo.find({
      is_admin: true,
    }).exec((err, admins) => {
      if (err) throw err;
      req.admins = admins;
      next();
    });
  },

  /* Check current user role */
  checkRole(req, res, next) {
    if (req.session.user) {
      UserInfo.findOne({
        user_id: req.session.user.id,
      }).exec((err, user) => {
        if (err) throw err;
        if (user) req.isAdmin = true;
        req.isLogin = true;
        next();
      });
    } else {
      next();
    }
  },

  /* Add a user to admin list */
  add(req, res, next) {
    /* if(!req.isAdmin){
            res.send('You are not admin!\nYou cannot do this operation');
        } */
    UserInfo.update({ _id: req.body.user_id }, { is_admin: true });
    next();
  },

  /* Remove a user to admin list */
  remove(req, res, next) {
    UserInfo.update({ _id: req.body.user_id }, { is_admin: false });
  },
};
