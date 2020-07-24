const express = require('express');
const Admins = require('../models/index').contests;

const router = express.Router();

router.route('/')

  /* Check if the current user has admin authority */
  .all((req, res, next) => {
    Admins.findOne({
      where: { user_id: req.session.user_id },
    })
      .then((user) => {
        if (user)next();
        else res.send('You are not an admmin!');
      })
      .catch((err) => { throw err; });
  })

  /* List all users */
  .get((req, res) => {
    Admins.findAll()
      .then((users) => {
        res.json(users);
        res.end();
      })
      .catch((err) => { throw err; });
  })

  /* Check if user exist in admin list */
  .post((req, res, next) => {
    Admins.findOne({
      user_id: req.body.user_id,
    })
      .then((user) => {
        if (user)res.send('User exist!');
        else next();
      })
      .catch((err) => { throw err; });
  })

  /* Put a user to admin list */
  .post((req, res) => {
    Admins.create({
      user_id: req.body.user_id,
    })
      .then(() => {
        res.redirect('/admins');
      })
      .catch((err) => { throw err; });
  });

router.route('/:user_id')

  /* Check if the current user has admin authority */
  .all((req, res, next) => {
    Admins.findOne({
      where: { user_id: req.session.user_id },
    })
      .then((user) => {
        if (user)next();
        else res.send('You are not an admmin!');
      })
      .catch((err) => { throw err; });
  })

  /* Check whether the user exist */
  .all((req, res, next) => {
    Admins.findOne({
      where: { user_id: req.params.user_id },
    })
      .then((user) => {
        if (!user)res.send('No such user!!');
        req.user = user;
        next();
      })
      .catch((err) => { throw err; });
  })

  /* View user info */
  .get((req, res) => {
    res.redirect(`/users/${req.user.user_id}`);
  })

  /* Remove user from admin list */
  .delete((req, res) => {
    Admins.delete({
      where: { user_id: req.user.user_id },
    })
      .then(() => {
        res.redirect('/admin');
      })
      .catch((err) => { throw err; });
  });

module.exports = router;
