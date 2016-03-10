var express = require('express');
var router = express.Router();
var Task = require('../models/task');
var User = require('../models/user');




router.get('/', function(req, res, next) {
  Task.find({
    author: req.user.username
  }, function(err, docs){
    res.render('tasks', { title: 'Tasks', tasks: docs});
  });
  
});



router.get('/:taskName', function(req, res, next) {
  
  if (req.params.taskName == 'new') {
    next();
    
  } else {
    Task.findOne({
      author: req.user.username,
      name: req.params.taskName
    }, function(err, docs){
      res.render('task', { title: 'Tasks', task: docs});
    });
  }
});

router.get('/:taskName/edit', function(req, res, next) {

  Task.findOne({
    author: req.user.username,
    name: req.params.taskName
  }, function(err, docs){
    
    res.render('taskEdit', { title: 'Tasks', task: docs});
  });
});


router.post('/:taskName/edit', function(req, res, next) {

  Task.findOneAndUpdate({
    author: req.user.username,
    name: req.params.taskName
  }, {
    body: req.body.body
  },
  function(err, docs){
    
   res.redirect('/tasks/' + req.params.taskName);
  });
});


router.get('/new', function(req, res, next) {
  res.render('newTask', { title: 'New' });
});

router.post('/new', function(req, res, next) {
  
  Task.findOne({
    author: req.user.username,
    name: req.body.name
    
  }, function(err, docs) {
    console.dir(docs);
    if (docs) {
      res.render('newTask', { title: 'New', error: 'Task with such name exists'});
    } else {
      var task = new Task({
        author: req.user.username,
        name: req.body.name,
        body: req.body.body
      });
      task.save();
      res.redirect('/tasks/' + req.body.name);
    }
  }
  );
  
  
});

module.exports = router;
