const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProblemTagSchema = new Schema(
  {
    name: { type: String, required: true },
    problems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
  },
);

module.exports = mongoose.model('ProblemTag', ProblemTagSchema);
