const mongoose = require('mongoose')
const Admins = mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
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