var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//module for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// Database Setup
const mongoose = require('mongoose');
let db = require('./db');

// point mongoose to the DB URI
mongoose.connect(db.URI, { useNewUrlParser: true, useUnifiedTopology: true });

let mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
    console.log('Connected to MongoDB...');
});


var indexRouter = require('../app/routes/index.server.routes');
let  businessContactRouter = require('../app/routes/business.contact.routes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../app/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

//setup express session
app.use(session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false
}));

//initialize flash for messages
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//create a user model instance for the passport user configuration
let userModel = require('../app/model/user');
let User = userModel.User;

//user strategy for authentication login
passport.use(User.createStrategy());

//encrypt and decrypt user information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/business-contact', businessContactRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
