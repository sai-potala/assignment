const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userRouter = express.Router()
const User = require('../models/User.js')
const { generateToken, isAuth, isAdmin } = require("../utils.js");
const { findById, findByIdAndUpdate } = require('../models/User.js')



userRouter.get("/all", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

userRouter.delete("/delete/:id",isAuth,isAdmin,async (req, res) => {
   const user = await User.findById(req.params.id);
   if (user) {
     const deleteUser = await user.remove();
     const users = await User.find({});
     res.send(users);
   } else {
     res.send({ message: "User Not Found" });
   }
});


userRouter.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    const password = await bcrypt.compareSync(req.body.password, user.password);
    if (password) {
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        isAdmin: user.isAdmin,
        image: user.image,
        token: generateToken(user),
      });
    } else {
      res.status(401).send({ message: "invalid password" });
    }
    return;
  }
  res.status(401).send({ message: "invalid email id" });
});


userRouter.post("/createUser", async (req, res) => {
  const emailCheck = await User.findOne({ email: req.body.email });
  const mobileCheck = await User.findOne({ mobile: req.body.mobile });
  if (emailCheck) {
    res.status(404).send({ message: "email already existing" });
    return;
  }
  if (mobileCheck) {
    res.status(404).send({ message: "Mobile Number already existing" });
    return;
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    isAdmin: req.body.isAdmin,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  try {
    const createdUser = await user.save()
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      mobile: createdUser.mobile,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  } catch (err) {
    console.log("cmae to error : ", err.message);
    res.status(404).send({ message: err.message });
  }
});


userRouter.put("/updateUser/:id",isAuth,async(req,res)=>{
    console.log(req.body)
    console.log(req.params.id)
    const userInfo = await User.findById({_id:req.params.id})
    console.log(userInfo)
    if(req.body.email){
      const emailCheck = await User.findOne({ email: req.body.email });
      if(emailCheck){
        res.status(400).send({message:"email already existing in records"})
      }
    }
    if (req.body.mobile) {
      const mobileCheck = await User.findOne({ mobile: req.body.mobile });
      if (mobileCheck) {
        res.status(400).send({ message: "Mobile No already existing in records" });
      }
    }

    const data = {
      name: req.body.name ? req.body.name : userInfo.name,
      email: req.body.email ? req.body.email : userInfo.email,
      mobile: req.body.mobile ? req.body.mobile : userInfo.mobile,
      password: req.body.password ? bcrypt(req.body.password, 8) : userInfo.password,
      image:req.body.image ? req.body.image : userInfo.image
    };
    
    try{
      const updatedData = await User.findByIdAndUpdate({ _id: userInfo._id }, data, {
        new: true,
      }).select("-password")
      res.status(200).send(updatedData)
    }
    catch(error){
      console.log("error",error)
      res.status(404).send({message:error.message})
    }


})


module.exports = userRouter