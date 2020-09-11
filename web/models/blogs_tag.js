const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogTagSchema = new Schema(
  {
    name: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true },
  },
);

module.exports = mongoose.model('BlogTag', BlogTagSchema);
