import express, { Request, Response } from 'express'
import routes from './routes'
import helmet from 'helmet'
import connect from './Utils/connect'
import logger from './Utils/logger'
import * as dotenv from 'dotenv'

(async () => {
  dotenv.config()
  const app = express()

  await connect({ exitOnFailure: false })

  // Middleware
  app.use(express.json())
  app.use(helmet())

  // Function call to the function that contains all the routes
  routes(app)

  const port = process.env.PORT;
  app.listen(port, () => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    logger.info(`Application listening at http://localhost:${port}`)
  })
})()
