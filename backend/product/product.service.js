const db = require('../_helpers/db');
const status_codes = require('../_helpers/status-codes');
const Product = db.Product;
const mongoose = require('mongoose');

module.exports = {
  getProduct
};

async function getProduct() {
  return await Product.find();
}

async function saveP(data) {
  return await Product.save({
    ...data,
    sku:'sak89',
    status: status_codes.ACTIVE_CODE
  });
};
