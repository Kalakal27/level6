const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

authRouter.post("/signup", async (req, res, next) => {
  // console.log(req.body, "test")
  try { const user = await User.findOne({ username: req.body.username });
      if (user) {
        res.status(403);
        return next(new Error("that username is already in use!"));
      }

      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET);
      return res.status(201).send({ token, user: savedUser.withoutPassword() });
  
    } catch (err) {
      res.status(500);
      return next(err);
    }
  });

  authRouter.post("/login", async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if(user) {
        res.status(403)
        // return next(new Error("Username or Password are incorrect"))
      }
      if(!user){
        res.status(403)
        return next(new Error("Username or Password are incorrect"))
      }

      user.checkPassword(req.body.password, (err, isMatch) => {
        if(err){
          res.status(403)
          return next(new Error("Username or Password are incorrect"))
        }
        if(!isMatch){
          res.status(403)
          return next(new Error("Username or Password are incorrect"))
        }
        const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
        console.log("token", token)
      return res.status(201).send({ token, user: user.withoutPassword()});
      })
    } 
    catch (err) {
      res.status(500);
      return next(err);
    }
  });

 


module.exports = authRouter