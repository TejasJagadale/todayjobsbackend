const mongoose = require('mongoose');

const govLinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: String,
  category: String
}, { timestamps: true });

module.exports = mongoose.model('GovLink', govLinkSchema);