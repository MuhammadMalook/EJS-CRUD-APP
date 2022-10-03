const express = require('express')
const app = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Admins = require('../shemas/admins')
const Users = require('../shemas/users')



app.get('/', (req,res)=>{
    res.status(200).json({msg:"hello"})
})

const users = []
const JWT_SECRET = process.env.JWT_SECRET

app.post('/register',async(req, res)=>{
    const {fullname, email, password, imageUrl} = req.body
    const ifExist = await Admins.findOne({email})
    console.log(ifExist)
    if(ifExist)
       return res.status(401).json({success:false, msg:"User Already Exist"})
    
    console.log("hereererere")
    const hashPass = await bcrypt.hash(password, 10)
    const admin = await Admins.create({fullname,email,password:hashPass, imageUrl})
   return  res.status(200).json({success:true, admin, msg:"Registered Succesfully"})
})

app.post('/login', async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password)
        return res.status(401).json({success:false, msg:"please enter full data"})
    const admin = await Admins.findOne({email})
    if(admin)
    {  
        const checkPass = await bcrypt.compare(password, admin.password)
        if(checkPass)
        {
            console.log(process.env.JWT_SECRET)
            const token =  jwt.sign({email},JWT_SECRET, {
                algorithm:'HS256',
                expiresIn:300
            })
           return res.status(200).json({success:true, data:users, token})
        }
        else
           return res.status(401).json({success:false, msg:"incorrect password"})
    }
    else
      return res.status(401).json({success:false, msg:"incorrect email"})
    


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

