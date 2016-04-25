// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const messageSchema = new Schema({
  user: String,
  text: String,
});

// the schema is useless so far
// we need to create a model using it
const Message = mongoose.model('Message', messageSchema);

// make this available to our messages in our Node applications
module.exports = Message;
