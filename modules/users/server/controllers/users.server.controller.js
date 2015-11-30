var express = require('express');
var passport = require('passport');
var router = express.Router();
var Usuarios = require('../models/Usuarios');


/* GET home page. */
router.get('/', function(req, res, next) {
  if(! req.user){
    res.redirect('/login');
    
  }else{
    res.redirect('/ejemplo');
  }
  // res.render('users', { user: req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Usuarios.register(new Usuarios({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          // return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('users', { user : req.user });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.send({ success : false, message : 'authentication failed' });
    }
    console.log(user);
    return  res.redirect('/ejemplo');
  })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});



module.exports = router;