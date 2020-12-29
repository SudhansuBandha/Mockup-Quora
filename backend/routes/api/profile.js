require('dotenv').config({ path: '.env' })

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");


//Load Person Model
const Person = require("../../models/Person");

//Load Question Model
const Question = require("../../models/Question")

//Load Answer Model
const Answer = require("../../models/Answers");

//multer setting
var storage = multer.memoryStorage();

var upload = multer({
  storage: storage
})



//=================================
//             Profile
//=================================


// @type    GET
//@route    /api/profile/:id
// @desc    route for  user profiles
// @access  PUBLIC
router.get(
  "/:id",
  (req, res) => {
    
    Person.findOne({ _id: req.params.id })
      .then((profile) => {
        if (!profile) {
          return res.status(404).json({ profilenotfound: "No profile Found" });
        }
        res.json(profile);
      })
      .catch((err) => console.log("got some error in profile " + err));
    }
);

//@type    GET
//@route    /api/profile/description/user
// @desc    route for user profile_details
// @access  PRIVATE
router.get(
  "/description/user",
  passport.authenticate( "jwt",{ session : false }),
  async (req, res) => {
    const profile = await Person.findOne({ _id: req.user.id })
    res.json(profile.description)
  }
);



// @type    POST
//@route    /api/profile/
// @desc    route for UPDATING/SAVING personnal user profile
// @access  PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req,res)=>{
    const profileValues = {};
    profileValues.user = req.user.id;
    
  
   

    
    
    if (req.body.username) profileValues.username = req.body.username;
    if (req.body.email) profileValues.email = req.body.email;
    if (req.body.password) profileValues.password = req.body.password;
    if (req.body.description) profileValues.description = req.body.description;
    if (req.body.image) {}

    if(req.body.password){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(profileValues.password, salt, (err, hash) => {
        if (err) throw err;
        profileValues.password = hash;
      });
    });
    }

    
    //Do database stuff
    Person.findOne({ _id: req.user._id })
      .then((profile) => {
        if (profile) {
          
          Person.findOneAndUpdate(
            { _id: req.user._id },
            { $set: profileValues },
            { new: true }
          )
            .then((profile) => res.json(profile))
            .catch((err) => console.log("problem in update" + err));
        } 
      })
      .catch((err) => console.log("Problem in fetching profile" + err));
    }
);



router.post('/image',
passport.authenticate("jwt",{session:false}),
upload.single("file"),
 (req, res)=>{
  
  const file= req.file
  const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK
  
  const profileValues = {};

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
    })
   
    let params ={
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL:"public-read"
    }
    s3bucket.upload(params, function(err, data){
      if(err){
        res.status(500).json({err:true, Message:err});
      }else{
        profileValues.profilepic= s3FileURL+file.originalname
        //Do database stuff
        Person.findOne({ _id: req.user._id })
              .then((profile) => {
              if (profile) {
                console.log(profileValues)          
                Person.findOneAndUpdate(
                { _id: req.user._id },
                { $set: profileValues },
                { new: true }
              )
              .then((profile) => res.json(profile))
              .catch((err) => console.log("problem in update" + err));
              } 
          })
          .catch((err) => console.log("Problem in fetching profile" + err));
  
      }
    })
});


router.delete("/image",
passport.authenticate("jwt",{session:false}),
(req,res)=>{
  
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
    })
 
    let params ={
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.body.name
    } 
    
    s3bucket.deleteObject(params,(err, data)=>{
      if(err){
        console.log(err)
      }else{
        res.json("Successfully deleted")
      }
    })

})

// @type    DELETE
//@route    /api/profile/
// @desc    route for deleting user based on ID
// @access  PRIVATE

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Person.findOne({ _id: req.user.id })
    .then(()=>{
      Person.findOneAndRemove({ _id: req.user.id })
        .then(()=>{
          Question.deleteMany({user:req.user.id})
          .then(()=>{
            Answer.deleteMany({user:req.user.id})
            .then(()=>{
              res.json({message:"Deleted Successfully"})
            })
            .catch((err)=>{console.log(err)})
          }).
          catch((err)=>{console.log(err)})
        })
        .catch((err) => console.log(err));
        
    })
    .catch((err)=>res.json({message:"User not found"}))
    
    }
);



// @type    POST
//@route    /api/profile/follow_request_to/:id
// @desc    route for making a follow request to personnal user 
// @access  PRIVATE

 router.post("/follow_request_to/:id",
 passport.authenticate("jwt",{ session: false }),
 async (req,res)=>{
   let profile_to= await Person.findOne( {_id:req.params.id} )
   
   let newValues={}
   newValues.user=req.user.id
   console.log(newValues.user)
   profile_to.followers.unshift(newValues)
   
   profile_to.save()
  .then(res.json({success:true}))
  .catch((err)=>console.log(err))
   
  
 }
 ) 


 // @type    POST
//@route    /api/profile/follow_request_from/:id
// @desc    route for making a follow request from personnal user 
// @access  PRIVATE


router.post("/follow_request_from/:id",
 passport.authenticate("jwt",{ session: false }),
 async (req,res)=>{
   let profile_from= await Person.findOne( {_id:req.user.id} )
   
   let newValues={}
   newValues.user=req.params.id
   console.log(newValues.user)


   profile_from.following.unshift(newValues)
  profile_from.save().then(res.json({success:true})).catch((err)=>console.log(err)) 
  }
 )

// @type    POST
//@route    /api/profile/unfollow_request_to/:id
// @desc    route for making an unfollow request personnal user 
// @access  PRIVATE

router.post("/unfollow_request_to/:id",
passport.authenticate("jwt",{ session: false }),
async (req,res)=>{
  const profile_to= await Person.findOne( {_id:req.params.id} )
  
  const removethis = profile_to.followers
          .map((item) => item.id)
          .indexOf(req.user.id)

  profile_to.followers.splice(removethis, 1)       
  
  
  profile_to.save()
   .then(()=>{res.json({success:true})})
   .catch((err)=>console.log(err))
}
) 

// @type    POST
//@route    /api/profile/unfollow_request_from/:id
// @desc    route for making an unfollow request from personnal user 
// @access  PRIVATE

router.post("/unfollow_request_from/:id",
passport.authenticate("jwt",{ session: false }),
async (req,res)=>{
  const profile_from= await Person.findOne( {_id:req.user.id} )
  
  const removethis = profile_from.following
          .map((item) => item.id)
          .indexOf(req.user.id)

  profile_from.following.splice(removethis, 1)       
  
  
  profile_from.save()
   .then(()=>{res.json({success:true})})
   .catch((err)=>console.log(err))
}
) 

module.exports = router;
