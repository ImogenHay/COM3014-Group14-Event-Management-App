import express, {Request, Response} from 'express'
import routes from './routes'
import helmet from 'helmet'
import connect from "./utils/connect";

const app = express()

// middleware
app.use(express.json());
app.use(helmet());


app.listen(3000, async () => {
    console.log("Application listenig at http://localhost:3000")
    await connect();

    //Function call to the function that contains all the routes
    routes(app);

})