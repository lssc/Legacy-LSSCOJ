const Admins = require('../models/index').admins;

module.exports = {

  /* List all admin users */
  list(req, res, next) {
    Admins.findAll()
      .then((admins) => {
        req.admins = admins;
        next();
      })
      .catch((err) => { throw err; });
  },

  /* Add a user to admin list */
  add(req, res, next) {
    /* if(!req.isAdmin){
            res.send('You are not admin!\nYou cannot do this operation');
        } */
    Admins.findOne({
      where: { user_id: req.body.user_id },
    })
      .then((existAdmin) => {
        if (existAdmin) {
          res.send('User Exist!');
        } else {
          Admins.create({
            user_id: req.body.user_id,
          })
            .then((admin) => {
              req.admin = admin;
              next();
            })
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => { throw err; });
  },

  /* Remove a user to admin list */
  remove(req, res, next) {
    /* if(!req.isAdmin){
            res.send('You are not admin!\nYou cannot do this operation.');
        } */
    Admins.findOne({
      where: { user_id: req.params.user_id },
    })
      .then((existAdmin) => {
        if (!existAdmin) {
          res.send('User is not in admin list!');
        } else {
          existAdmin.destroy()
            .then(() => next())
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => { throw err; });
  },
};