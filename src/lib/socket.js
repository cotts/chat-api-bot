import Message from '../api/v1/message/message.model'
import dotenv from 'dotenv'

dotenv.config()

import { Server } from 'socket.io'

/**
 *
 * @param {HttpServer} server - HTTP Server to connect websocket
 */
function socketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.URL,
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    // Add socket user to room
    socket.on('join', (arg, callback) => {
      socket.join(arg)
      callback(arg)
    })
  })
}
