const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserMsgSchema = new Schema(
  {
    sender: { types: Schema.Types.ObjectId, ref: 'UserInfo', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'UserInfo', required: true },
    message: { types: String, maxlength: 5000, required: true },
    sned_time: { types: Date, default: Date.now },
    read_time: { types: Date },
  },
);

module.exports = mongoose.model('UserMsg', UserMsgSchema);
