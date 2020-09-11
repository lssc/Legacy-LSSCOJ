const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContestAskSchema = new Schema(
  {
    contest: { type: Schema.Types.ObjectId, ref: 'Contest', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'UserInfo', required: true },
    question: { type: String, required: true },
    answer: { type: String },
    post_time: { type: Date, default: Date.now },
    reply_time: { type: Date },
  },
);

module.exports = mongoose.model('ContestAsk', ContestAskSchema);
