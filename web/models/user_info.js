const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserInfoSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    current_contest: { type: Schema.Types.ObjectId, ref: 'Contest' },
    rating: { type: Number },
    register_time: { type: Date, default: Date.now },
    quote: { type: String, default: '' },
    is_admin: { type: Boolean, default: false },
  },
);

UserInfoSchema
  .virtual('url')
  .get(() => `/user/${this._id}`);

module.exports = mongoose.model('UserInfo', UserInfoSchema);
