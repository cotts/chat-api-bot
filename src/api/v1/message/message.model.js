import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    roomId: String,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    message: String,
  },
  { timestamps: true }
)

const Message = mongoose.model('message', schema)

export default Message
