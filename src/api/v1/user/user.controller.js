import * as service from './user.service'

export function getUser(req, res) {
  const { username, password } = req.body
  return service
    .getUser(username, password)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).send(error.message))
}

export function create(req, res) {
  const { name, username, password } = req.body
  service
    .createUser(name, username, password)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).send(error.message))
}
