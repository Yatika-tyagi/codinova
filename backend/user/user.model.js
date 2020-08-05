const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const status_codes=require('../_helpers/status-codes')
const schema = new Schema({
    name: { type: String, unique: false, required: true },
    role: { type: String, unique: false, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: false, required: true },
    status: { type: Number, required: false, default:status_codes.ACTIVE_CODE },
    isDeleted: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    updated: { type: Date, required: false, default: Date.now },
}, { id: false });

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('user', schema); 
