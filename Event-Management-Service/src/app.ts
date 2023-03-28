import express, {Request, Response} from 'express'
import routes from './routes'
import helmet from 'helmet'

const app = express()

// middleware
app.use(express.json());
app.use(helmet());

//Function call to the function tha contains all the routes
routes(app);

app.listen(3000, () => {
    console.log("Application listenig at http://localhost:3000")


})