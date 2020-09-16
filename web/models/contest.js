const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContestSchema = new Schema(
  {
    name: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    status: { type: String },
    problems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
    managers: [{ type: Schema.Types.ObjectId, ref: 'UserInfo' }],
    registrants: [{ type: Schema.Types.ObjectId, ref: 'UserInfo' }],
    user_likes: [{ type: Schema.Types.ObjectId, ref: 'UserInfo' }],
  },
);

module.exports = mongoose.model('Contest', ContestSchema);
