var user = require('../models/user');
var parse = require('co-body');

var log4js = require('log4js');
var logger = log4js.getLogger();

var views = require('co-views');

var path  = require('path');
var render = views('views', {
    ext: 'ejs'
});


exports.registration = function *(next) {
    logger.debug('GET /register');
    this.body = yield render('register');
};

exports.register = function *(next) {
    var body = yield parse(this);
    var username = body.username;
    var password = body.password;

    var newUser;
    try {
        newUser = yield user.register(username, password);
    } catch (err) {
        newUser = null;
    }
    if (!newUser) {
        this.status = 401;
    } else {
        this.redirect('/login');
    }

};

exports.authorization = function *(next) {
    logger.debug('GET /login');
    this.body = yield render('index');
};

exports.authorize = function *(next) {
    var body = yield parse(this);
    var username = body.username;
    var password = body.password;

    var User;
    try {
        User = yield user.authorize(username, password);
    } catch (err) {
        logger.debug('Error', err);
        User = null;
    }

    logger.debug('User: ' + User);
    if (!User) {
        this.status = 401;
    } else {
        this.session.userId = User._id;
        this.redirect('/profile');
    }

};

exports.exit = function *(next)

{
    this.session.userId = yield null;
};

exports.edit = function *(next) {

};

exports.profile = function *(next) {
    logger.debug('GET /profile');
    logger.debug('session.userId: ' + this.session.userId);
    if (!this.session.userId) {
        this.redirect('/login');
    } else {
        this.body = yield render('profile');
    }

};

