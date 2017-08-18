const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let snippetSchema = new Schema ({
  title: String,
  code: String,
  notes: String,
  language: String,
  tags: String
});

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
