var task = require('../models/task');
var parse = require('co-body');

var log4js = require('log4js');
var logger = log4js.getLogger();

var views = require('co-views');

var path  = require('path');

exports.create = function *(next) {
  var body = yield parse(this);
  var name = body.name;
  var description = body.description;
  var author = body.author;
  var startDate = body.startDate;
  var deadline = body.deadline;
  var newTask;

  try {
    newTask = yield task.create(name, description, author, startDate, deadline);
  } catch (err) {
    newTask = null;
  }
  if (!newTask) {
    this.json({"Error" : "Error while creating task"});
  } else {
    this.json({"User" : newTask});
  }

};

exports.get = function *(next) {
  var body = yield parse(this);
  var userId = body.userId;
  var task;
  try {
    task = yield task.get(userId);
  } catch(err) {
    task = null;
  }
  yield this.json(task);
};

exports.remove = function *(next) {
  var body = yield parse(this);
  var _id = body._id;
  var result;
  try {
    result = yield task.get(userId);
  } catch(err) {
    result = null;
  }
  yield this.json(result);
};

exports.addContributor = function *(next) {
  var body = yield parse(this);
  var taskId = body.taskId;
  var userId = body.userId;

  var result;
  try {
    result = yield task.addContributor(taskId, userId);
  } catch(err) {
    result = null;
  }
  yield this.json(result);
};

exports.getContributor = function *(next) {
  var body = yield parse(this);
  var taskId = body.taskId;
  var userId = body.userId;

  var contributor;
  try {
    contributor = yield task.getContributor(taskId, userId);
  } catch(err) {
    contributor = null;
  }
  yield this.json(contributor);
};

exports.removeContributor = function *(next) {
  var body = yield parse(this);
  var taskId = body.taskId;
  var userId = body.userId;

  var result;
  try {
    result = yield task.removeContributor(taskId, userId);
  } catch(err) {
    result = null;
  }
  yield this.json(result);
};

