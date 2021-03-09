import dotenv from 'dotenv'
dotenv.config()

export default function verifyToken(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization === process.env.APIKEY
  )
    next()
  else res.status(401).send('Server Unauthorized')
}
