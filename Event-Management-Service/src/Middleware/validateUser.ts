import {Request, Response, NextFunction} from 'express'

export function validateUser (req:Request, res:Response, next:NextFunction) {
    next()
}