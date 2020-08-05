const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const status_codes=require('../_helpers/status-codes')
const productSchema = new Schema({
  productId: { type: String, unique: false, required: true },
  userId: { type: String, unique: false, required: true },
  price: { type: String, unique: false, required: true },
  quantity: { type: String, unique: false, required: true },
  total: { type: String, unique: false, required: true },
});

const schema = new Schema({
    products: [productSchema],
    tax: { type: String, unique: false, required: true },
    discount: { type: String, unique: false, required: true },
    status: { type: Number, required: false, default:status_codes.ACTIVE_CODE },
    isDeleted: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    updated: { type: Date, required: false, default: Date.now },
}, { id: false });

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('cart', schema);
