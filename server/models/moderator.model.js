const mongoose = require('./index');

const modSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  canAdd: {
    type: Boolean,
    default: false
  },
  token: {
    type: String
  }
});

module.exports = mongoose.model('Moderator', modSchema);