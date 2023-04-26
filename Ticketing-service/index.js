const express = require("express");
const app = express();
const mongoose = require("mongoose");

// set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set up database connection
mongoose.connect("mongodb://127.0.0.1:27017/ticketing-service", {
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
