import Message from '../api/v1/message/message.model'
import dotenv from 'dotenv'

dotenv.config()

import { Server } from 'socket.io'

const io = new Server(server, {
  cors: {
    origin: process.env.URL,
    methods: ['GET', 'POST'],
  },
})
