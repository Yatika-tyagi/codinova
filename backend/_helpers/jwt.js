const expressJwt = require('express-jwt');
const config = require('../../dbconfig.json');
const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/users/signup',
      '/users/login',
    ]
  });
}

async function isRevoked(req, payload, done) {
  console.log(`payload ${payload.email}`);

  const user = await userService.getByEmail({ email: payload.email });

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
