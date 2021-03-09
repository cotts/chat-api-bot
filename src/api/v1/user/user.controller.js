import * as service from './user.service'

export function getUser(req, res) {
  const { username, password } = req.body
  return service
    .getUser(username, password)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).send(error.message))
}
