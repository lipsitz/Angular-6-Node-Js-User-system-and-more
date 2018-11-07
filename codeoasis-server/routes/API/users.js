var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../../config/database');
require('../../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../../models/user.schema');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'CodeOasis' });
});

// --------REGISTER NEW USER---------------
router.post('/signup', function (req, res, ) {
  console.log('------------------------------------------------');
  console.log(req.body.password, req.body.lastName, req.body.email);

  var user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  });

  user.save(function (err) {
    if (err) {
      return res.json({ success: false, msg: 'Username already exists.' });
    }
    console.log('the new user is saved!')
    // res.setHeader()
    res.json('user Add Successfully');
  });
});

// -----------------USER LOGIN-----------------------------
router.post('/signin', function (req, res) {
  console.log(req.body);
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({ success: true, token: 'JWT ' + token, user });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
});


getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
module.exports = router;
