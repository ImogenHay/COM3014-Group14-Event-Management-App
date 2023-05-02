require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up database connection
mongoose.connect(process.env.MONGO_URI, {
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
