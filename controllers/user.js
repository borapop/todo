var user = require('../models/user');
var parse = require('co-body');

var log4js = require('log4js');
var logger = log4js.getLogger();


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
        this.json({"Error" : "User exists"});
    } else {
        this.json({"User" : newUser.username});
    }

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
        this.json({"Error" : "Such username and password are not found"});
    } else {
        this.session.userId = User._id;
    }

};





