const express = require('express')
const app = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


app.get('/', (req,res)=>{
    res.status(200).json({msg:"hello"})
})

const users = []
const JWT_SECRET = "fddsfdsasgk"

app.post('/register',async(req, res)=>{
    const {fname,lname, email, password} = req.body
    const ifExist = users.find(user=> user.email === email)
    if(ifExist)
        res.status(401).json({success:false, msg:"User Already Exist"})
    
    const hashPass = await bcrypt.hash(password, 10)
    const course = {fname, lname, email,password:hashPass}
    users.push(course)
    res.status(200).json({success:true, data:users, msg:"Registered Succesfully"})
})

app.post('/login', async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password)
        res.status(401).json({success:false, msg:"please enter full data"})
    const user = users.find(user=> user.email === email)
    if(user)
    {
        const index = users.indexOf(user)
        const checkPass = await bcrypt.compare(password, users[index].password)
        if(checkPass)
        {
            console.log(process.env.JWT_SECRET)
            const token =  jwt.sign({email},JWT_SECRET, {
                algorithm:'HS256',
                expiresIn:300
            })
            res.status(200).json({success:true, data:users, token})
        }
        else
            res.status(401).json({success:false, msg:"incorrect password"})
    }
    else
    res.status(401).json({success:false, msg:"incorrect email"})
    


})
app.get('/users', (req, res)=>{
    const {token} = req.headers
    if (!token) {
        return res.status(401).json({success:false, msg:"unauthorized user"})
      }
var payload
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, JWT_SECRET)
    console.log(payload)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).json({success:false, msg:e})
    }
    // otherwise, return a bad request error
    return res.status(400).json({success:false, msg:'wrong token'})
  }
  res.status(200).json({success:true, msg:`Welcome ${payload.email}!`})
})

module.exports = app

