import * as service from './message.service'

export function fetchAll(req, res) {
  const { roomId } = req.params
  service
    .getRoomMessages(roomId)
    .then((data) => res.json(data))
    .catch((error) => {
      res.status(400).send(error.message)
    })
}
