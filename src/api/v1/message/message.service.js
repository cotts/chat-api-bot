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
