const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
  name: { type: String, min: [1], max: [100], required: true },
  email: {
    type: String,
    required: true
  },
  phoneNumber: { type: Number, required: true },
  profileImages: [{ type: Schema.Types.ObjectId, ref: 'file' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', schema);
