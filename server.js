const express = require("express")
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt} = require("express-jwt")


process.env.SECRET
app.use(express.json())
app.use(morgan('dev'))

app.use("/auth", require("./rout/authRouter.js"))
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
// app.use('/api/Todo', require('./rout/todoRouter.js'))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
      res.status(err.status)
    }
    return res.send({errMsg: err.message})
  })

mongoose.connect("mongodb+srv://Valley:0wNlOLXECnoA8jyP@stardew.ummbzdc.mongodb.net/?retryWrites=true&w=majority")
console.log('connected to DB')


app.listen(9000, () => {
    console.log("the server is running on Port 9000")
})

