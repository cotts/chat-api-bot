import Message from './message.model'

/**
 *
 * @param {Array} list - Array of message objects
 */
function parserMessageList(list) {
  const parsedMessages = list.map((message) => {
    const parsedMessage = { ...message }
    parsedMessage.sender = message.sender._id
    parsedMessage.name = message.sender.name

    return parsedMessage
  })

  return parsedMessages
}

/**
 *
 * @param {string} roomId - room name / id
 */
export function getRoomMessages(roomId) {
  try {
    return Message.find({ roomId })
      .populate({
        path: 'sender',
        select: 'name _id',
      })
      .lean()
      .limit(50)
      .sort({ createdAt: '1' })
      .then(parserMessages)
  } catch (error) {
    throw new Error('Error on retrieve room messages')
  }
}
