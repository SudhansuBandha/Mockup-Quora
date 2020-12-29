const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require("passport")

//Load Person Model
const Person = require("../../models/Person")


//Load Question Model
const Question = require("../../models/Question")

//Load Answer Model
const Answer = require("../../models/Answers");

//Load Following Model
const Following = require("../../models/Following")

//=================================
//             Follow
//=================================


// @type    POST
//@route    /api/following/request
// @desc    route for follow request
// @access  PRIVATE

router.post("/request",
passport.authenticate("jwt", { session: false }),
 (req, res) => {

    console.log(req.body)

    const follow_request = new Following({
        userFrom:req.user.id,
        userTo:req.body.userTo,
        answerTo:req.body.answerTo,
        questionTo:req.body.questionTo,
        type:req.body.type
    });

    follow_request.save()
    .then((result)=>{res.json({success:true,result})})
    .catch((err)=>{console.log(err)})

});


// @type    POST
//@route    /api/following/unfollow_request
// @desc    route for unfollow request
// @access  PRIVATE


router.post("/unfollow_request", 
passport.authenticate("jwt", { session: false }),
(req, res) => {

    if(req.body.type==="user"){
        Following.findOneAndDelete({ "userTo": req.body.userTo, "userFrom": req.user.id })
        .then(()=>{res.json({message:"Successfully Unfollowed",success:true})})
        .catch((err)=>{console.log(err)})
    }

    if(req.body.type==="question"){
        Following.findOneAndDelete({ "questionTo": req.body.questionTo, "userFrom": req.user.id })
        .then(()=>{res.json({message:"Successfully Unfollowed",success:true})})
        .catch((err)=>{console.log(err)})
    }

   
    
});


// @type    GET
//@route    /api/following/followers
// @desc    route for fetching followers 
// @access  PUBLIC


router.post("/followers", (req, res) => {
    
    if(req.body.type==="user"){
        Following.find({ 
            "userTo": req.body.userTo,
            "type":req.body.type 
        }).populate("userFrom")
        .then((result)=>{
            res.json(result)
                    
        })
        .catch((err)=>{console.log(err)})
    }

    if(req.body.type==="question"){
        Following.find({ 
            "questionTo": req.body.questionTo, 
        })
        .then((result)=>{
            res.json(result)
        })
        .catch((err)=>{console.log(err)})
    }

    
    

});


// @type    GET
//@route    /api/following/
// @desc    route for fetching users to whom logged in user is following  
// @access  PUBLIC

router.post("/", 
(req, res) => {
    
    Following.find({ 
            "userFrom": req.body.userId,
            "type":req.body.type 
        })
        .populate("userTo")
        .then((result)=>{
            res.json(result)
            
        })
        .catch((err)=>{console.log(err)})
})

// @type    POST
//@route    /api/following/followed/user
// @desc    route for checking whether loggedinuser is following the user or not 
// @access  PUBLIC

router.post("/followed/user",
passport.authenticate("jwt",{session:false}),
 (req, res) => {
    
    
        Following.find({ "userTo": req.body.userTo, "userFrom": req.body.userFrom })
        .exec((err, followed) => {
            if (err) return res.status(400).send(err)
            
            let result = false;
            if (followed.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, followed: result })
        })
    

    
});

// @type    POST
//@route    /api/following/followed/question
// @desc    route for checking whether loggedinuser is following the question or not 
// @access  PUBLIC

router.post("/followed/question",
passport.authenticate("jwt",{session:false}),
 (req, res) => {
    //console.log("reached followed_question")
    //console.log(req.body)
        Following.find({ "questionTo": req.body.questionTo, "userFrom": req.body.userFrom })
        .exec((err, followed) => {
            if (err) return res.status(400).send(err)
            
            let result = false;
            if (followed.length !== 0) {
                result = true
            }
            
            res.status(200).json({ success: true, followed: result })
        })
    

    
});


module.exports = router;