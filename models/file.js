const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  deleted: {
    type: Boolean,
    default: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('file', schema);
