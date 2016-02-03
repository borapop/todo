var MongoClient = require('../libs/db');
var url = 'mongodb://localhost:27017/sp';
var crypto = require('crypto');

var config = require('../config');

var log4js = require('log4js');
var logger = log4js.getLogger();

function encryptPassword(password, salt) {
    return crypto.createHmac('sha256', config.get("enc:secret1"))
        .update(password + salt)
        .digest("hex");
}

exports.register = function (username, password) {
    return function(callback) {
      MongoClient.connect(url, function (err, db) {
        if (err) {
          callback(err);
        } else {
          logger.debug('connected to mongodb');
          var collection = db.collection('users');
          collection.findOne({username: username}, function (err, document) {
            if (err) {
              callback(err);
            } else {
              logger.debug(document);

              if (document !== null) {
                callback(new Error("User already exists"));
              } else {
                var salt = Math.random() * 100000000000000000 + '';
                var hash = encryptPassword(password, salt);

                collection.insert({
                  username: username,
                  hash: hash,
                  salt: salt
                }, function (err, result) {
                  if (err) callback(err);
                  db.close();
                  logger.debug('mongo result: ' + result);
                  callback(null, result.insertedCount);
                });
              }
            }
          });
        }
      });
    }

};

exports.authorize = function (username, password) {
  return function(callback) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        callback(err);
      } else {
        logger.debug('connected to mongodb');
        var collection = db.collection('users');
        collection.findOne({username: username}, function (err, document) {
          if (err) {
            callback(err);
          } else {
            logger.debug(document);

            if (document === null) {
              callback(new Error("No such user"));
            } else {
              if(document.hash === encryptPassword(password, document.salt)) {
                callback(null, document._id);
              } else {
                callback(new Error('Wrong password'));
              }

            }
          }
        });
      }
    });
  }
};