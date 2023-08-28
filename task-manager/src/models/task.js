const mongoose = require('mongoose')
const { Schema } = mongoose

const TaskModel = mongoose.model(
  'Task',
  new Schema(
    {
      description: {
        type: String,
        required: true,
        trim: true
      },
      completed: {
        type: Boolean,
        default: false
      },
      owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }
    },
    { timestamps: true }
  )
)

module.exports = TaskModel
