const mongoose = require('mongoose')
const Users = mongoose.Schema({
    fullname:{
        type: String
    },
    email:{
        type:String
    },
    phone: {
        type: Number,
        minlength:[11, "Inavid Number"],
        unique:[true,"User Already Exists with number"]
    },
    about: {
        type:String
    },
    imageUrl : {
        type:String
    }

    
})
module.exports = mongoose.model("Users", Users)