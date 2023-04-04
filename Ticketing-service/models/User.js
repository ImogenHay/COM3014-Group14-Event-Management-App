const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        firstName:{
            type:String,
            required: true
        },
        secondName:{
            type:String,
            required: true
        },
        Email: {
            type:String,
            required: true
        },
    }

)