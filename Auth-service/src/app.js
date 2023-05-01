const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const cors = require('cors')
const userRoutes = require('./routes')
const mongoose = require('mongoose')

(async () => {

// configuring dotenv
dotenv.config()
const port = process.env.PORT
const dbUri = process.env.dbURI

// Creation of our express app
const app = express()

//connecting to the database
try {
    await mongoose.connect(dbUri)
    console.log('Connected to the database')
} catch (error) {
    console.log('Could not connect to the database')
    console.log(error)
}

//middleware
app.use(express.json())
app.use(helmet())       //  Adds security to the headers
app.use(cors())         //  Allows for cross-origin resource sharing
// this middleware will log the requests path and method on the console, everytime the service gets a request
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
// using the user routes defined in the express router
app.use('/auth', userRoutes)

// listening for requests
app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`)
})
})()