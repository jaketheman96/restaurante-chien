const { statusCode } = require("../utils/statusCode");
const jwt = require('jsonwebtoken')
const { Users } = require('../models');

const secret = process.env.JWT_SECRET

const tokenValidator = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { user } = jwt.verify(authorization, secret);
    const checking = await Users.findByPk(user.id)
    if (!checking) return res.status(statusCode.NOT_FOUND).json({ message: 'Invalid Token' })
    return next();
  } catch (error) {
    return res.status(statusCode.NOT_FOUND).json({ message: 'Invalid Token' })
  }
};

module.exports = { tokenValidator };
