const db = require('../_helpers/db');
const status_codes = require('../_helpers/status-codes');
const Cart = db.Cart;
const mongoose = require('mongoose');

module.exports = {
  add
};

async function add(data) {
    return await new Cart({
      products: [...data],
      tax: data[0].tax || 0,
      discount: data[0].discount || 0
    }).save();
}
