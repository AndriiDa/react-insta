const jwt = require('jsonwebtoken')
const config = require('config')
const expressJwt = require('express-jwt')
const User = require('../models/Users')

//===========================================

exports.signUp = async (req, res) => {
  const userExist = await User.findOne({
    email: req.body.email
  })
  if (userExist) {
    return res.status(403).json({
      error: "such user is already exist"
    })
  }
  const user = await new User(req.body)
  await user.save()
  res.json({
    //user: user,
    message: "User created succsess"
  })
}

//===========================================

exports.signIn = (req, res) => {
  const {
    email,
    password
  } = req.body
  //pasword todo bcryptjs

  User.findOne({
    email
  }, (err, user) => {
    if (err || !user) {
      return res.status(404).json({
        message: "such user isn`t exist. please sig in"
      })
    }

    const tocken = jwt.sign({
      _id: user._id
    }, config.get('jwtSecret'))

    res.cookie("t", tocken, {
      expire: new Date() + 1200
    })

    const {
      _id,
      name,
      email
    } = user;

    return res.json({
      tocken,
      user: {
        _id,
        name,
        email
      }
    })
  })
}

//===========================================

exports.signOut = (req, res) =>{
  res.clearCookie(":")
  return res.json({
    message: "sigout succsess."
  })
}

//===========================================

exports.requireSignIn = expressJwt({
  secret: config.get('jwtSecret'),
  userProperty: "auth"
})

