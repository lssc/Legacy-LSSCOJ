const ProblemsPermissions = require('../models/index').problems_permissions;

module.exports = {

  /* List all problems */
  list(req, res, next) {
    ProblemsPermissions.findAll({
      where: { problem_id: req.params.problem_id },
    }).then((permissions) => {
      req.problem_permissions = permissions;
      next();
    }).catch((err) => { throw err; });
  },

  /* Check if the current user has permission */
  check(req, res, next) {
    ProblemsPermissions.findOne({
      where: {
        problem_id: req.params.problem_id,
        user_id: req.session.user.id,
      },
    }).then((permission) => {
      if (permission)res.send('Permission denied!\nAsk problem creaters to give you permission.');
      else next();
    }).catch((err) => { throw err; });
  },

  /* Add a user to modify the problem */
  add(req, res, next) {
    ProblemsPermissions.findOne({
      where: {
        problem_id: req.params.problem_id || req.problem.id,
        user_id: req.body.user_id || req.session.user.id,
      },
    }).then((existPermission) => {
      if (existPermission) {
        res.send('User already has permission!');
      } else {
        ProblemsPermissions.create({
          problem_id: req.params.problem_id || req.problem.id,
          user_id: req.body.user_id || req.session.user.id,
        })
          .then((permission) => {
            req.problem_permission = permission;
            next();
          }).catch((err) => { throw err; });
      }
    }).catch((err) => { throw err; });
  },

  /* Remove a user from modifing the problem */
  /* You should check permissions first before remove. */
  remove(req, res, next) {
    ProblemsPermissions.findOne({
      where: {
        problem_id: req.params.problem_id,
        user_id: req.params.user_id,
      },
    }).then((existPermission) => {
      if (existPermission) {
        res.send('User don\'t have permission!');
      } else if (!req.problem_permission) {
        res.send('You do not have permission to remove user from permission!');
      } else {
        ProblemsPermissions.delete()
          .then(() => next()).catch((err) => { throw err; });
      }
    }).catch((err) => { throw err; });
  },
};
