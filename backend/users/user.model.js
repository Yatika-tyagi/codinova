const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    hash: { type: String, required: false },
    name: { type: String, required: true },
    status: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    code: {type: String, required: false}
}, { id: false });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
