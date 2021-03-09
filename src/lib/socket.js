import Message from '../api/v1/message/message.model'
import dotenv from 'dotenv'

dotenv.config()

import { Server } from 'socket.io'

/**
 * Store and send message to a specific room
 * @param {SocketIO} io - SocketIO instance
 * @param {String} room - Room name
 * @param {Object} message message to be stored and sent
 */
function storeAndSendMessage(io, room, message) {
  Message.create(message).then(({ _doc }) =>
    io.to(room).emit('message', { ..._doc, name: message.from })
  )
}

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

    // room1 store and send message to room
    socket.on('room1', (message) => {
      storeAndSendMessage(io, 'room1', message)
    })

    // room2 store and send message to room
    socket.on('room2', (message) => {
      storeAndSendMessage(io, 'room2', message)
    })

    // room3 store and send message to room
    socket.on('room3', (message) => {
      storeAndSendMessage(io, 'room3', message)
    })
  })
}

export default socketServer
