var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Sign Up' });
});

router.post('/', function(req, res, next) {
  console.log('registering user');
  User.register(new User({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/tasks');
  });
});

module.exports = router;
