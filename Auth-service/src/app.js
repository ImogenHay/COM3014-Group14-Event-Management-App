const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const cors = require('cors')
const userRoutes = require('./routes')
const mongoose = require('mongoose')

// ( async () =>{
// configuring dotenv
dotenv.config()
// getting env variables
const port = process.env.PORT
const dbUri = process.env.dbURI

// getting our certificate
const ca = 'config/X509-cert.pem'

// setting the database connection options
const options = {
    sslKey: ca,
    sslCert: ca,
    serverSelectionTimeoutMS: 1000
}

// Creation of our express app
const app = express()

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

mongoose.connect(dbUri, options)
    .then(() => {
        // listen for requests
        app.listen(port, () => {
            console.log('Connected to the database')
            console.log(`Application listening at http://localhost:${port}`)
        })
    })
    .catch((error) => {
        console.log('Could not connect to the database, application not listening')
        console.log(error)
    })