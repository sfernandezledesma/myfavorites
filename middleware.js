const jwt = require('jsonwebtoken');
const config = require('./config.js');

const checkToken = (req, res, next) => {
  let token =
    req.headers['x-access-token'] || // Express headers are auto converted to lowercase
    req.headers['authorization'] ||
    req.body.token ||
    req.cookies.token;
  
  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = checkToken;