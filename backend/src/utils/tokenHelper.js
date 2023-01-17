const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const generateToken = (id) => jwt.sign(id, secret);

module.exports = { generateToken }