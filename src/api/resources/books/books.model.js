// 3rd party libraries
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// define the book schema
let bookSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  description:{
    type: String
  },
  price: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Book', bookSchema);