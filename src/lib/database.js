import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const user = process.env.DB_USER
const password = process.env.DB_PASS
const host = process.env.DB_HOST
const database = process.env.DB_NAME

const connectionString = `mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority`

export const connect = () => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  mongoose.connection.on('connected', () => {
    console.info(`Database connected @ ${host}/${database}`)
  })
}
