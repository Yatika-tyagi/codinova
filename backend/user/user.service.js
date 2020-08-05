const db = require('../_helpers/db');
const status_codes = require('../_helpers/status-codes');
const User = db.User;
const mongoose = require('mongoose');

module.exports = {
  login
};

async function login(data) {
  return await User.find({email: data.email, password: data.password});
}
