const mongoose = require('mongoose')
const Users = mongoose.Schema({
    fullname:{
        type: String
    },
    email:{
        type:String
    },
    Phone: {
        type: Number,
        minlength:[11, "Inavid Number"]
    },
    About: {
        type:String
    },
    imageUrl : {
        type:String
    }

    
})
module.exports = mongoose.model("Users", Users)