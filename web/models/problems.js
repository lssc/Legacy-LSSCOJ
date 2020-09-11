const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProblemSchema = new Schema(
  {
    title: { type: String, required: true },
    statement: { type: String, required: true },
    input_description: { type: String, required: true },
    output_description: { type: String, required: true },
    samples: [{ type: Schema.Types.ObjectId, ref: 'ProblemSample' }],
    hint: { type: String },
    is_hidden: { type: Boolean, default: true },
    hackable: { type: Boolean, default: true },
    editors: [{ type: Schema.Types.ObjectId, ref: 'UserInfo' }],
  },
);

ProblemSchema
  .virtual('url')
  .get(() => `/problems/${this._id}`);

module.exports = mongoose.model('Problem', ProblemSchema);
