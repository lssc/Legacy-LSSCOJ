const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProblemSampleSchema = new Schema(
  {
    input: { type: String, required: true },
    output: { type: String, required: true },
  },
);

module.exports = mongoose.model(ProblemSampleSchema);
