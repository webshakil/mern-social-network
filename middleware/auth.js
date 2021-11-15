//This file is created after the creation of routes/api/user.js. This is custom middleware
const jwt = require('jsonwebtoken');
const config = require('config'); // we need the secret

module.exports = function (req, res, next) { //This is a middleware function. It has req, res object and next callback, next determines what will happen if it is done perfectly.
                                                                 // go next piece of middleware
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {          //this line will decode the token. jwtSecret is coming form config/default.json
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;  //now we can use req.user for any of our protected routes
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};


//In case of 'x-auth-token' user has to supply username/password for the first time and server returns a access-token in
 //header field 'x-auth-token'. For further sessions this token is exchanged, not the username/password.
