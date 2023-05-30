const jsonWebToken = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (!token) {
    next(new UnauthorizedError('Login required'));
    return;
  }
  let payload;

  try {
    payload = jsonWebToken.verify(token, process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'secret-key');
  } catch (err) {
    next(new UnauthorizedError('Login required'));
    return;
  }
  req.user = payload;
  next();
};
