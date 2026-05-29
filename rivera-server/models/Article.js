const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    default: '',
  },
  content: {
    type: [String],
    required: true,
    default: [],
  },
});

module.exports =
  mongoose.models.Article || mongoose.model('Article', articleSchema);
