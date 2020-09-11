const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogTagSchema = new Schema(
  {
    name: { type: String, required: true },
    blog: { type: Schema.Types.ObjectId, required: true },
  },
);

module.exports = mongoose.model('BlogTag', BlogTagSchema);
