const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require("passport")
const date_eval=require("./evaluatedate")

//Load Person Model
const Person = require("../../models/Person")


//Load Question Model
const Question = require("../../models/Question")

//Load Answer Model
const Answer = require("../../models/Answers");

//Load Comment Model
const Comment = require("../../models/Comment")



//=================================
//             Comments
//=================================


// @type    POST
//@route    /api/comment/:answer_id
// @desc    route for posting comment
// @access  PRIVATE

router.post("/:answer_id",
 passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const comment =new Comment({
        user:req.user.id,
        answerId:req.params.answer_id,
        content:req.body.comment,
        //responseToId:req.body.responseToId
    }) 

        comment
            .save()
            .then((comment) =>{ 
                Comment.find({'_id':comment._id})
                       .populate('user')
                       .populate('answerId')
                       .exec((err, result) => {
                        if (err) return res.json({ success: false, err })
                        return res.status(200).json({ result })
                    }) 
            })
            .catch((err) => console.log(err));
})


// @type    GET
//@route    /api/comment/:answer_id
// @desc    route for fetching  comments of particular answer
// @access  PRIVATE

router.get("/:answer_id", (req, res) => {

    Comment.find({ "answerId": req.params.answer_id })
        .populate('user')
        .sort({date:"desc"})
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json( comments )
        })
});

// @type    DELETE
//@route    /api/comment/:comment_id
// @desc    route for deleting  comment of particular answer
// @access  PRIVATE

router.delete("/:comment_id",  
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        Comment.findOneAndRemove({ _id: req.params.comment_id })
        .then(()=>{res.json("Deleted Comment Successfully")})
        .catch((err)=>console.log(err))
        
  .catch((err)=>console.log(err))
}
);



module.exports = router;