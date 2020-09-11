const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    post_time: { type: Date, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'UserInfo', required: true },
    user_like: [{ type: Schema.Types.ObjectId, ref: 'UserInfo' }],
    is_draft: { type: Boolean, required: true },
    importance: {
      type: Number, max: 5, min: 1, default: 1,
    },
  },
);

module.exports = mongoose.model('BlogSchema', BlogSchema);
