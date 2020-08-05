const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const status_codes=require('../_helpers/status-codes')
const schema = new Schema({

    name: { type: String, unique: true, required: true },
    category: { type: String, unique: false, required: true },
    sku: { type: String, unique: false, required: true },
    price: { type: Number, unique: false, required: true },
    quantity: { type: Number, unique: false, required: true },

    status: { type: Number, required: false,default:status_codes.ACTIVE_CODE },
    isDeleted: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    updated: { type: Date, required: false, default: Date.now },
}, { id: false });

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('product', schema);
