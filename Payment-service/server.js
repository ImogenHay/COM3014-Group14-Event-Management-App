require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const helmet = require("helmet");
const cors=require("cors");

// set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
// set up database connection
// const fs = require('fs');
// const ca = require('config/X509-cert.pem');
const ca = 'config/X509-cert.pem';

// setting the database connection options
const options = {
    sslKey: ca,
    sslCert: ca,
    serverSelectionTimeoutMS: 1000
};

mongoose.connect(process.env.MONGO_URI,options, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("error", (error) => console.log(error));
mongoose.connection.once("open", () =>
    console.log("Connected to database")
);

// set up routes
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/", paymentRoutes);

// start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
