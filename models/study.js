const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/SSSurvey', { useMongoClient: true });

module.exports = mongoose.model('Study', {
  public_name: String,
  public_description: String,
  private_name: String,
  private_description: String,
  number_of_participants: Number,
  link: String,
  completion_notes: String,
  participants: [{ type: Schema.Types.ObjectId, ref: 'Participant' }]
});
