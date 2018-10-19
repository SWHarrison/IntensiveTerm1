const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/SSSurvey', { useMongoClient: true });

module.exports = mongoose.model('Participant', {
  name: String,
  age: Number,
  sex: String,
  contact: String,
  studies: [{ type: Schema.Types.ObjectId, ref: 'Study' }]
});
