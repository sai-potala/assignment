const multer = require("multer");
const express = require("express");
const fs = require("fs");
const path = require("path");
const Card = require('../models/Card.js');
const{isAuth} = require('../utils')
let pathh = path.join(__dirname, "../../frontend/public/images");

const cardRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, pathh);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

cardRouter.get('/all/:id',async(req,res) =>{
  try{
    const allData = await Card.find({userInfo:req.params.id}).select("-img")
    res.status(200).send(allData)
  }
  catch(error){
    console.log(error.message)
    res.status(404).send({message:error.message})
  }

})  


cardRouter.post("/upload/:id", upload.single("image"), async(req, res) => {
    var newItem = new Card()
    newItem.img.data = fs.readFileSync(req.file.path);
    newItem.userInfo = req.params.id
    newItem.img.contentType = "image/png";
    const result = await newItem.save();
    console.log("result is ",result)
  res.send({ path: `/${req.file.filename}`, cardInfo: result });
});


cardRouter.post("/create/:id",isAuth,async(req, res) => {
    const cardDetails = await Card.findOne({ _id : req.params.id});
    console.log("one more post", cardDetails);
    const data = {
      title:req.body.title,
      text:req.body.text,
      imgLink:req.body.image
    }
    try{
      const updatedDetails = await Card.findByIdAndUpdate({_id:cardDetails._id},data,{new:true})
      res.status(200).send({message:"details updated"})
    }
    catch(error){
      res.status(404).send({message:error.message})
    }


});

module.exports = cardRouter;
