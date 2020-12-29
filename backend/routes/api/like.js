const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require("passport");

//Loading Dislikes Model
const Dislikes = require('../../models/Dislikes');


//Loading Likes Model
const Likes = require('../../models/Likes');



//=================================
//             Likes DisLikes
//=================================

// @type    GET
//@route    /api/like/getLikes/:id
// @desc    route for fetching likes
// @access  PUBLIC

router.get("/getLikes/:id", (req, res) => {

    let variable = {}

    variable = {answerId: req.params.id}

    Likes.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })


})

// @type    GET
//@route    /api/like/getDislikes/:id
// @desc    route for fetching dislikes
// @access  PUBLIC

router.get("/getDislikes/:id", 
(req, res) => {
    let variable = {}

    variable = {answerId: req.params.id}

    
    Dislikes.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            
            res.status(200).json({ success: true, dislikes })
        })

})

// @type    POST
//@route    /api/like/upLike/
// @desc    route for posting uplike
// @access  PRIVATE

router.post("/upLike",
passport.authenticate("jwt", {session:false}), 
(req, res) => {
    console.log(req.body)
    let variable = {}

        variable = { answerId: req.body.answerId, 
            userId: req.user.id 
        }
    
    const like = new Likes(variable)
    //save the like information data in MongoDB
    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });
        //In case disLike Button is already clicked, we need to decrease the dislike by 1 
        Dislikes.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })

})


// @type    POST
//@route    /api/like/unLike
// @desc    route for posting unlike
// @access  PRIVATE

router.post("/unLike",
passport.authenticate("jwt", {session:false}), 
(req, res) => {

    let variable = {}

    variable = { answerId: req.body.answerId, 
        userId: req.user.id 
    }

    Likes.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })

})

// @type    POST
//@route    /api/like/unDislike/
// @desc    route for posting undislike
// @access  PRIVATE

router.post("/unDislike",
passport.authenticate("jwt", {session:false}),
 (req, res) => {

    let variable = {}

        variable = { answerId: req.body.answerId, 
            userId: req.user.id 
        }

    Dislikes.findOneAndDelete(variable)
    .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })


})


// @type    POST
//@route    /api/like/upDislike/
// @desc    route for posting upDislike
// @access  PRIVATE

router.post("/upDislike",
passport.authenticate("jwt", {session:false}),
 (req, res) => {
    console.log(req.body)
    let variable = {}

        variable = { answerId: req.body.answerId, 
            userId: req.user.id 
        }

    const disLike = new Dislikes(variable)
    //save the like information data in MongoDB
    disLike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });
        //In case Like Button is already clicked, we need to decrease the like by 1 
        Likes.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })


})

module.exports = router;