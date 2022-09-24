const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json())
app.use(require('./routes/auth'))
console.log(process.env.JWT_SECRET)
const PORT = 5000
app.listen(PORT, ()=>console.log(`Your server is running on the port ${PORT}`))

