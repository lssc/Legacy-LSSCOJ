const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContestSchema = new Schema(
  {
    name: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    status: { type: String },
    problem: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
    manager: [{ type: Schema.Types.ObjectId, ref: 'UserInfo' }],
    registrant: [{ type: Schema.Types.ObjectId, ref: 'UserInfo' }],
    user_like: [{ type: Schema.Types.ObjectId, ref: 'UserInfo' }],
  },
);

module.exports = mongoose.model('Contest', ContestSchema);
