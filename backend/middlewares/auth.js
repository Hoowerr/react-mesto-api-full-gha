const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Login required'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'secret-key');
  } catch (err) {
    next(new UnauthorizedError('Login required'));
    return;
  }
  req.user = payload;
  next();
};
