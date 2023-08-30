const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const TaskModel = require('./task')

const { Schema } = mongoose
const userSchema = new Schema(
  {
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
      unique: true,
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
    },
    avatar: {
      type: Buffer
    },
    tokens: [{ token: { type: String, required: true } }]
  },
  { timestamps: true }
)

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.method('toJSON', function () {
  const newUser = this.toObject()
  delete newUser.password
  delete newUser.tokens
  delete newUser.avatar

  return newUser
})

userSchema.method('generateAuthToken', async function () {
  const token = jwt.sign({ _id: this._id.toString() }, 'secretKey')
  this.tokens = this.tokens.concat({ token })

  await this.save()

  return token
})

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await UserModel.findOne({ email })

  if (!user) {
    throw new Error('Unable to login')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw new Error('Unable to login')
  }

  return user
}

userSchema.pre('deleteOne', { document: true }, async function (next) {
  console.log('before', this)
  await TaskModel.deleteMany({ owner: this._id })
  console.log('after', this)
  next()
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }

  next()
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
