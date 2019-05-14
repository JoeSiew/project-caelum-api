const Joi = require('joi')
const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
})

const User = mongoose.model('User', userSchema)

function validateUser(user) {
  const schema = {
    username: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required()
  }

  return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser