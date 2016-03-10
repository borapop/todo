var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */

var User = require('../models/user');


passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', passport.authenticate('local'), function(req, res) {
  res.redirect('/tasks');
});


module.exports = router;
