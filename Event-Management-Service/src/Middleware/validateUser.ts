import { type Request, type Response, type NextFunction } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import logger from '../Utils/logger'

const validateUser = (req: Request, res: Response, next: NextFunction): any => {
  // getting the secret from environment variables
  const secret = process.env.SECRET as string

  // Retrieving authorization string from req header
  const { authorization } = req.headers

  // making sure the authorization string is there
  if (authorization == null) {
    return res.status(401).json({ error: 'The Authorization token is required' })
  }

  // extracting the token
  const token = authorization.split(' ')[1]
  // this might not be needed

  try {
    // verifying the token using the secret and retrieving the users ID from it
    const { _id } = jwt.verify(token, secret) as JwtPayload

    // assigning the ID as a parameter to the req
    req.userId = _id
  } catch (error) {
    logger.info(error)
    res.status(401).json({ error: 'The Request is not authorized' })
  }

  next()
}

export default validateUser
