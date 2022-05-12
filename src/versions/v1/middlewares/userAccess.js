const jwt = require('jsonwebtoken');
const APIError = require('../errors/APIError');

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */
module.exports = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token === process.env.SECRET_API_TOKEN) {
    req.params.accountId = 8;
    return next();
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (typeof decoded.id !== 'number') throw new APIError({ code: 400, message: 'token not valid' });
  if (typeof decoded.date !== 'number') throw new APIError({ code: 400, message: 'token not valid' });

  req.user = { accountId: decoded.id }; // Changer params pour user
  return next();
};
