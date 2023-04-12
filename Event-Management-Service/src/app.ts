import express, { Request, Response } from 'express'
import routes from './routes'
import helmet from 'helmet'
import connect from './Utils/connect'
import logger from './Utils/logger'
import config from "config";

// const app = express()
//
// // Middleware
// app.use(express.json())
// app.use(helmet())
//
// // Function call to the function that contains all the routes
// routes(app)
//
// app.listen(3000, async () => {
//   logger.info('Application listening at http://localhost:3000')
//   await connect()
// })

(async () => {
  const app = express();

  await connect({exitOnFailure: false});

  // Middleware
  app.use(express.json());
  app.use(helmet());

  // Function call to the function that contains all the routes
  routes(app);

  const port = config.get<number>('port');
  app.listen(port,() => {
    logger.info(`Application listening at http://localhost:${port}`)
  })
})();