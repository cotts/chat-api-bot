import User from './user.model'

/**
 * Check if username already exists
 * @param {String} username - username
 * @returns {Boolean}
 */
async function userExists(username) {
  return User.findOne({ username }).then((data) => !!data)
}
