const mongoose = require('mongoose');

const { Schema } = mongoose;

const SubmissionSchema = new Schema(
  {
    problem: { type: Schema.Types.ObjectId, ref: 'Problem', required: true },
    contest: { type: Schema.Types.ObjectId, ref: 'Contest' },
    submit_time: { type: Date, default: Date.now },
    submitter: { type: Schema.Types.ObjectId, ref: 'UserInfo', required: true },
    code: { type: String, required: true },
    language: { type: String, enum: ['C', 'C++', 'Java', 'Python'], required: true },
    judge_time: { type: Date },
    result: { type: String, enum: ['ACCEPT', 'WAITING', 'FAILED'], default: 'WAITING' },
    status: { type: String },
    score: { type: Number },
    used_time: { type: Number },
    used_memory: { type: Number },
    is_hidden: { type: Boolean, default: false },
  },
);

SubmissionSchema
  .virtual('total_size')
  .get(() => this.code.length);

module.exports = mongoose.model('Submission', SubmissionSchema);
