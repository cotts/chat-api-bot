import Message from '../api/v1/message/message.model'
import dotenv from 'dotenv'
import { Server } from 'socket.io'

dotenv.config()

const botList = process.env.BOT_LIST.split(',')
const roomsList = process.env.ROOMS_LIST.split(',')
const corsList = process.env.CORS_LIST.split(',')

/**
 *  Intercept message to be sent to bot module
 * @param {SocketIO Instance} io socketIO Instance
 * @param {Object} message
 * @returns {Object / null}
 */
async function intercept(io, message) {
  const botName = botList.find((bot) => message.message.startsWith(bot))

  if (botName) {
    io.to(botName).emit('run', message)
    return
  }
  if (message.bot) {
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
      origins: [corsList],
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    // Add socket user to room
    socket.on('join', (arg, callback) => {
      socket.join(arg)
      callback(arg)
    })

    //BOT Room request
    socket.on('requestRoom', (arg, callback) => {
      socket.join(arg)
      callback(arg)
    })

    //Request available Rooms
    socket.on('listRooms', (callback) => {
      callback(roomsList)
    })

    //bot response
    socket.on('botEmit', (roomId, message) => {
      io.to(roomId).emit('message', message)
    })

    //rom send message
    socket.on('sendMessage', (roomId, message) => {
      storeAndSendMessage(io, roomId, message)
    })

    //PING-PONG Emit
    socket.on('ping', (callback) => {
      callback('pong')
    })
  })
}

export default socketServer
