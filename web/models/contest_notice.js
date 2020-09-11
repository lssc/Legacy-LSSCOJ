const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContestAnnounceSchema = new Schema(
  {
    contest: { type: Schema.Types.ObjectId, ref: 'Contest', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    announce_time: { type: Date, default: Date.now },
  },
);

module.exports = mongoose.model('ContestAnnounce', ContestAnnounceSchema);
