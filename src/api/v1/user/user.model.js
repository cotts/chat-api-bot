import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username cannot be blank and is unique'],
    },
    name: {
      type: String,
      required: [true, 'name cannot be blank'],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const User = mongoose.model('user', schema)

export default User
