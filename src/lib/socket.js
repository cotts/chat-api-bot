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

    // room1 store and send message to room
    socket.on('room1', (message) => {
      Message.create(message).then(({ _doc }) =>
        io.to('room1').emit('message', { ..._doc, name: message.from })
      )
    })

    // room2 store and send message to room
    socket.on('room2', (message) => {
      Message.create(message).then(({ _doc }) =>
        io.to('room2').emit('message', { ..._doc, name: message.from })
      )
    })

    // room3 store and send message to room
    socket.on('room3', (message) => {
      Message.create(message).then(({ _doc }) =>
        io.to('room3').emit('message', { ..._doc, name: message.from })
      )
    })
  })
}
