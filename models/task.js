var MongoClient = require('../libs/db');
var url = 'mongodb://localhost:27017/sp';
var crypto = require('crypto');

var config = require('../config');

var log4js = require('log4js');
var logger = log4js.getLogger();

exports.create = function (name, description, author, startDate, deadline) {
  return function (callback) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        callback(err);
      } else {
        logger.debug('connected to mongodb');
        var collection = db.collection('tasks');

        collection.insertOne({
          name: name,
          description: description,
          author: author,
          contributors: [],
          startDate: startDate,
          deadline: deadline
        }, function (err, result) {
          if (err) callback(err);
          db.close();
          logger.debug('mongo result: ' + result);
          callback(null, result);
        });
      }
    });
  }

};

exports.get = function(userId) {
  return function (callback) {
    MongoClient.connect(url, function(err, db){
      if (err) callback(err);
      var collection = db.collection('tasks');
      collection.find({contributors: {userId}},
        function (err, docs) {
          return docs;
      });
    });
  }
};

exports.remove = function (_id) {
  return function (callback) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        callback(err);
      } else {
        logger.debug('connected to mongodb');
        var collection = db.collection('tasks');
        collection.remove({
          _id: _id
        }, function (err, result) {
          if (err) callback(err);
          db.close();
          logger.debug('mongo result: ' + result);
          callback(null, result.nRemoved);
        });
      }
    });
  }

};

exports.addContributor = function(taskId, userId) {
  return function (callback) {
    MongoClient.connect(url, function(err, db){
      if (err) callback(err);
      var collection = db.collection('tasks');
      collection.update({_id: taskId},
        {$push: {contributors: {userId}}}
      , function(err, result){
          if (err) callback(err);
          db.close;
          callback(null, result);
        });
    });
  }

};

exports.getContributor = function(taskId, userId) {
  return function (callback) {
    MongoClient.connect(url, function(err, db){
      if (err) callback(err);
      var collection = db.collection('tasks');
      collection.findOne({_id: taskId, contributors: {userId}}
        , function(err, result){
          if (err) callback(err);
          db.close;
          callback(null, result);
        });
    });
  }

};

exports.removeContributor = function (taskId, userId) {
  return function (callback) {
    MongoClient.connect(url, function(err, db){
      if (err) callback(err);
      var collection = db.collection('tasks');
      collection.update({_id: taskId},
        {$pull: {contributors: {userId}}}
        , function(err, result){
          if (err) callback(err);
          db.close;
          callback(null, result);
        });
    });
  }
};
