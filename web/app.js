const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const sess = {
  name: 'sessionId',
  secret: 'CHANGE_THS_OPTIONAL',
};

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');
const problemsRouter = require('./routes/problems');
const contestsRouter = require('./routes/contests');
const submissionsRouter = require('./routes/submissions');
const hacksRouter = require('./routes/hacks');
const judgeRouter = require('./routes/judge');

const Admins = require('./models/index').admins;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/problems', problemsRouter);
app.use('/contests', contestsRouter);
app.use('/submissions', submissionsRouter);
app.use('/hacks', hacksRouter);
app.use('/judge', judgeRouter);

// check whether current user has admin authority
app.use((req, res, next) => {
  if(req.session.user_id){
    Admins.findOne({
      where: {user_id: req.session.user_id},
    })
    .then(user => {
      if(user)req.isAdmin = true;
      next();
    })
    .catch(err => { throw err; });
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
