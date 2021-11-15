const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    //see if user exists
    const { name, email, password } = req.body;
    
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }



     //get user gravatar
      const avatar = normalize(
        gravatar.url(email, {
          s: '200', //size
          r: 'pg', //rating
          d: 'mm' //default
        }),
        { forceHttps: true }
      );


      //encrypt password using bcrypt
      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //we now need json webtoken so that they can get the token, once they registered, they can use the token to authenticate and access protected routes
      //json web token a tin dhorener color thake and 3 ta ongso thake, ekta header red part, 2nd part payload ar ekta verified signature. amader paylod ta lagbe. 
      //Payload is very improtant. Thats the data you want to send within the token. We can identify which user it is with token. By this payload we can understand which user
      //is logged in and whose profile need to be updated. 

      const payload = {
        user: {
          id: user.id
        }
      };
                  // now we should send the information to middleware/auth.js
      jwt.sign(
        payload,
        config.get('jwtSecret'), //jwtSecret is coming from config/default.json
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err; //possible error and token itself. Either we get the error or the token
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
