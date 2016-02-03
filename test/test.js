var task = require('../models/task');
require('mocha-generators').install();
var assert = require('assert');
var taskName = 'test';
var taskDescription = 'test';
var userId = '56a2754eafaa06944586a23c';
var starDate = new Date();
var deadline = new Date();
var newTask;
var removedTask;

describe('task functions', function () {
  describe('create task', function () {
    before(function *() {
      newTask = yield task.create(taskName, taskDescription, userId, starDate, deadline);
    });

    it('should create a task', function *() {

    })
  });

  describe('add contributors', function () {
    before(function *() {
      newContributors = yield task.addContributor(newTask.insertedId, userId);
    });
    it('should add contributors', function *() {

    });
  });

  describe('add contributors', function () {
    before(function *() {
      newContributors = yield task.addContributor(newTask.insertedId, 500);
    });
    it('should add contributors', function *() {

    });
  });

  describe('remove contributor', function () {
    before(function*() {
      try {
        removedContributors = yield task.removeContributor(newTask.insertedId, userId);
      } catch (err) {
        console.log('err: ' + err);
      }
    });

    it('should delete contributors', function *() {

    });
  });


  describe('remove task', function(){
   before(function *() {
   removedTask = yield task.remove(newTask.insertedId);

   });

   it('should create a task', function *(){

   })
   });

});

//task.create();