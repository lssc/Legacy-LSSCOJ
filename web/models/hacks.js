const mongoose = require('mongoose');

const { Schema } = mongoose;

const HackSchema = new Schema(
  {
    problem: { type: Schema.Types.ObjectId, ref: 'Problem', required: true },
    submission: { type: Schema.Types.ObjectId, ref: 'Submission', required: true },
    hacker: { type: Schema.Types.ObjectId, ref: 'UserInfo', required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'UserInfo', required: true },
    input: { type: String, required: true },
    submit_time: { type: Date, default: Date.now },
    judge_time: { type: Date },
    success: { type: Boolean },
    details: { type: String },
  },
);

module.exports = mongoose.model('Hack', HackSchema);
