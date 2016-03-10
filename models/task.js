var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Task = new Schema({
  author: String,
  name: String,
  body: String
});


module.exports = mongoose.model('Task', Task);