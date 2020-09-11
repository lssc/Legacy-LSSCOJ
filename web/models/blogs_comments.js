const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogCommentSchema = new Schema(
  {
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    content: { type: String, required: true },
    post_time: { type: Date, default: Date.now },
    user_like: [{ type: Schema.Types.ObjectId, ref: 'UserInfo' }],
  },
);

module.exports = mongoose.model('BlogComment', BlogCommentSchema);
