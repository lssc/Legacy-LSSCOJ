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

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const problemRouter = require('./routes/problem');
const contestRouter = require('./routes/contest');
const submissionRouter = require('./routes/submission');
const hackRouter = require('./routes/hack');
const judgeRouter = require('./routes/judge');

const adminController = require('./controllers/admin');

const app = express();

// MongoDB Setup
dotenv.config();
const mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// check whether current user has admin authority
app.use(adminController.checkRole);

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/problem', problemRouter);
app.use('/contest', contestRouter);
app.use('/submission', submissionRouter);
app.use('/hack', hackRouter);
app.use('/judge', judgeRouter);

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
