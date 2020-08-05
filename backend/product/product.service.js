const db = require('../_helpers/db');
const status_codes = require('../_helpers/status-codes');
const Product = db.Product;
const mongoose = require('mongoose');

module.exports = {
  getProduct,
  saveP
};

async function getProduct() {
  return await Product.find();
}

async function saveP(data) {
  return await new Product({
    ...data,
    sku:'sak89', // in future can make it dynamic for electronics
    status: status_codes.ACTIVE_CODE
  }).save();
};
