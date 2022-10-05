const express = require('express')
const mongoose = require("mongoose");
const app = express()

const dotenv = require('dotenv');
dotenv.config();


app.use(express.json())
app.use(require('./routes/auth'))
// app.use('/images', express.static('uploads'))




mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB!!!')
});

const PORT = 5000
app.listen(PORT, ()=>console.log(`Your server is running on the port ${PORT}`))



