const mongoose = require('mongoose')
const Admins = mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String,
        unique:[true,"User Already Exists with Email"]
    },
    password:{
        type: String
    },
    imageUrl:{
        type:String,
        required: false
    },
    users:[]

})
module.exports = mongoose.model('Admins', Admins)