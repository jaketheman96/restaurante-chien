const jwt = require('jsonwebtoken');
const { statusCode } = require('../utils/statusCode');

const secret = process.env.JWT_SECRET;

const generateToken = (id) => jwt.sign(id, secret);

const tokenValidator = (token) => {
  if(!token) return statusCode.NOT_FOUND;
  const validation = jwt.verify(token, secret);
  return validation;
};

module.exports = { generateToken, tokenValidator }