const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const generateToken = async (id) => jwt.sign(id, secret);

const tokenValidator = async (token) => jwt.verify(token, secret);

module.exports = { generateToken, tokenValidator }