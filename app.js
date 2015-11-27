var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tareas');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// require('./models/Tareas');




// var routes = require('./routes/index');
var ejemplo = require('./modules/ejemplo/server/controllers/ejemplo.server.controller');
var panel = require('./modules/panel/server/controllers/panel.server.controller');
var login = require('./modules/users/server/controllers/users.server.controller');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'modules')));
//para definir los directorios de las librerias de bootstrap y angylar
app.use(express.static(path.join(__dirname, 'bower_components')));

// app.use('/', panel);
app.use('/', login);

app.use('/ejemplo', ejemplo);
// app.use('/panel', panel);
app.use('/users', users);

// passport config
var Usuarios = require('./modules/users/server/models/Usuarios');
passport.use(new LocalStrategy(Usuarios.authenticate()));
passport.serializeUser(Usuarios.serializeUser());
passport.deserializeUser(Usuarios.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
