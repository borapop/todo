var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */

var User = require('../models/user');


passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/', function(req, res, next) {
  if (req.user) {
    res.redirect('/tasks');
  } else {
    res.render('index', { title: 'Express' });
  }
  
});


router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.post('/', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});


module.exports = router;
