const mongoose = require('mongoose');
const { model } = require('./hack');

const { Schema } = mongoose;

const JudgerInfoSchema = new Schema(
  {
    password: { type: String, required: true },
    ip: { type: String, required: true },
    last_ping: { type: Date },
    status: { type: String, enum: ['IDLE', 'BUSY', 'DOWN'], required: true },
  },
);

model.exports = mongoose.model('JudgerInfo', JudgerInfoSchema);
