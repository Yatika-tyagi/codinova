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
