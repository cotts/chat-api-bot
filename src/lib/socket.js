import Message from '../api/v1/message/message.model'
import * as bot from '../../bot'
import dotenv from 'dotenv'

dotenv.config()

import { Server } from 'socket.io'

async function intercept(io, message) {
  if (message.message.startsWith('/stock=')) {
    io.to('botRoom').emit('runbot', message)
    return
  }
  if (message._id) {
    io.to(message.roomId).emit('message', message)
    return
  }
  return message
}

/**
 * Store and send message to a specific room
 * @param {SocketIO} io - SocketIO instance
 * @param {String} room - Room name
 * @param {Object} message message to be stored and sent
 */
function storeAndSendMessage(io, room, message) {
  intercept(io, message).then((data) => {
    if (data)
      Message.create(message).then(({ _doc }) =>
        io.to(room).emit('message', { ..._doc, name: message.from })
      )
  })
}

/**
 *
 * @param {HttpServer} server - HTTP Server to connect websocket
 */
function socketServer(server) {
  //TBD - Add Socket auth
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

    socket.on('request', () => socket.join('botRoom'))

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
