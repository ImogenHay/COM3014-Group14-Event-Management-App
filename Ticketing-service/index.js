const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors=require("cors");
// set up middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
const ca = 'config/X509-cert.pem';

// setting the database connection options
const options = {
    sslKey: ca,
    sslCert: ca,
    serverSelectionTimeoutMS: 1000
};
app.use(express.urlencoded({ extended: true }));
// set up database connection
mongoose.connect(process.env.MONGO_URI,options, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("error", (error) => console.log(error));
mongoose.connection.once("open", () => console.log("Connected to database"));

// set up routes
const routes = require("./routes/ticketRoutes");
app.use("/", routes);

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
