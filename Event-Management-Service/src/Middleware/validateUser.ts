import { type Request, type Response, type NextFunction } from 'express'

export function validateUser (req: Request, res: Response, next: NextFunction) {
  next()
}
