const User = require('../models/user');
const {nanoid} = require('nanoid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


exports.signup = (req, res) => {
  User.findOne({email: req.body.email}).exec((err, user) => {
    if(user) {
      return res.status(400).json({
        error: "email is taken"
      })
    }
    const { name, email, password } = req.body;
    let username = nanoid();

    let newUser = new User({name, email, password, username})
    newUser.save((err, success) => {
      if(err) {
        return res.status(400).json({
          error: err
        })
      }
      res.json({
        message: "Signup succes. Please Sign In"
      })
    })
  })
}



exports.signin = (req, res) => {
  const { email, password } = req.body;
  //check if user exists
  User.findOne({email}).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "User email do not exists. Please signup"
      })
    }
     //authenticate
     if(!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and pass do not match"
      }) 
    }
  //generate a token and send to client
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

    res.cookie('token', token, {expiresIn: '1d'})

    const { _id, username, name, email} = user;
    return res.json({
      token, user
    })

  })
 
}

exports.signout = (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "signout success"
  })
}