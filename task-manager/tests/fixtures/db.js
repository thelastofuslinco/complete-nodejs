const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const UserModel = require('../../src/models/user')
const TaskModel = require('../../src/models/task')

const _id = new mongoose.Types.ObjectId()
const mockUser = {
  name: 'any_name',
  email: 'any_mail@mail.com',
  password: '12345678',
  _id,
  tokens: [{ token: jwt.sign({ _id }, process.env.JWT_KEY) }]
}

const mockTask = {
  _id: new mongoose.Types.ObjectId(),
  description: 'any_description',
  completed: false,
  owner: mockUser._id
}

const setupDataBase = async () => {
  await UserModel.deleteMany()
  await TaskModel.deleteMany()
  await new UserModel(mockUser).save()
  await new TaskModel(mockTask).save()
}

module.exports = { mockUser, setupDataBase, mockTask }
