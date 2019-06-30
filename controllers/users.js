const User = require('../models/Users')
const _ = require('lodash')

exports.userById = (req, res, next, id) => {
  User.findById(id).exec(
    (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          error: 'User not found'
        })
      }
      req.profile = user
      next()
    }
  )
}

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile &&
    req.auth &&
    req.profile._id === req.auth._id
  if (!authorized) {
    res.status(403).json({
      error: "user is not authorized to perform this action"
    })
  }
}

exports.getAllUsers = (req, res) => {
  User.find(
    (err, users) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }
      res.json({
        users
      })
    }
  ).select(" _id name password")
}


exports.getUser = (req, res) => {
  return res.json(
    req.profile
  ).select(" _id name password") //ToDo impl neded fields
}

exports.userUpdate = (req, res, next) => {
  let user = req.profile
  user = _.extend(user, req.body)
  user.updated = Date.now()

  user.save(
    (err) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action"
        })
      }
      res.json({user})
    }
  )
}

exports.userDelete = (req, res, next) => {
  let user = req.profile
  user.remove(
    (err, user) => {
      if(err) {
        return req.status(400).json({
          error: err
        })
      }
      req.json({ message: "User deleted succsessfuly!" })
    }
  )
}