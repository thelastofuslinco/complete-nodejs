const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const UserModel = mongoose.model(
  'User',
  new Schema({
    name: {
      type: String,
      trim: true,
      required: true
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (Number(value) < 0) throw Error('Age must be a positive number')
      }
    },
    email: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) throw Error('Email is invalid')
      }
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 8
    }
  })
)

module.exports = UserModel
