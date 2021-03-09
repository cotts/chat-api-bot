import User from './user.model'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const passwordKey = process.env.PASSWORD_KEY
const passSalts = 8
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
  try {
    const user = await User.findOne({ username })
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Username or password is incorrect')
    }
    delete user.password
    return user
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * Create user if username doesn't exist
 * @param {String} name - user name
 * @param {String} username - user login name
 * @param {String} password - user password
 * @returns {Object}
 */
export async function createUser(name, username, password) {
  try {
    if (await userExists(username)) {
      throw new Error('User Already exists')
    }
    const hash = await bcrypt.hash(password, passSalts)

    return User.create({ name, username, password: hash })
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}
