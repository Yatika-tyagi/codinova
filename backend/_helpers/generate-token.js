const adminList = require('../_helpers/config-collection.json');
const jwt = require('jsonwebtoken');
const config = require('../../dbconfig.json');

module.exports = ({ name, email, status }) => {
return jwt.sign(
    {
      name: name,
      email: email,
      isAdmin: adminList.admin.includes(email),
      status: status
    },
    config.secret
  );
}