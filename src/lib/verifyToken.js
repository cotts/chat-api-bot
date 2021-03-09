import dotenv from 'dotenv'
dotenv.config()

export default function verifyToken(req, res, next) {
  if (
    req.header.authorization &&
    req.header.authorization === process.env.APIKEY
  )
    next()

  res.status(401).send('Server Unauthorized')
}
