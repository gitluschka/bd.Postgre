const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'dev-secret';
module.exports = {
  sign: payload => jwt.sign(payload, secret, { expiresIn: '12h' }),
  verify: token => jwt.verify(token, secret),
};
