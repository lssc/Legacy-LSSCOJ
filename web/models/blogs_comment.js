const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogCommentSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true },
    content: { type: String, required: true },
    post_time: { type: Date, default: Date.now },
    user_like: [{ type: Schema.Types.ObjectId, ref: 'UserInfo' }],
  },
);

module.exports = mongoose.model('BlogComment', BlogCommentSchema);
