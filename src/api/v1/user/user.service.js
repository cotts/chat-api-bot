import User from './user.model'

/**
 * Check if username already exists
 * @param {String} username - username
 * @returns {Boolean}
 */
async function userExists(username) {
  return User.findOne({ username }).then((data) => !!data)
}

/**
 *  Retrieve user using login and password
 * @param {String} username - user login name
 * @param {String} password - user password
 * @returns {Object}
 */
export async function getUser(username, password) {
  //TBD - Password Enctrypt
  try {
    const user = await User.findOne({ username })
    if (!user || user.password !== password) {
      throw new Error('Username or password is incorrect')
    }
    delete user.password
    return user
  } catch (error) {
    throw new Error(error.message)
  }
}
