const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Person Model
const Person = require("../../models/Person");

//Load Answer Model
const Answer = require("../../models/Answers")

//Load Question Model
const Question = require("../../models/Question");

//=================================
//             Question
//=================================

// @type    GET
//@route    /api/questions/
// @desc    route for showing all questions
// @access  PUBLIC
router.get("/", (req, res) => {
  Question.find()
    .sort({ date: "desc" })
    .then((questions) => res.json(questions))
    .catch((err) => res.json({ noquestions: "NO questions to display" }));
});

// @type    POST
//@route    /api/questions/
// @desc    route for submitting questions
// @access  PRIVATE

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newQuestion = new Question({
      question: req.body.question,
      user: req.user.id,
    });
    newQuestion
      .save()
      .then((question) => res.json(question))
      .catch((err) =>
        console.log("UNable to push question to database " + err)
      );
  }
);


// @type    POST
//@route    /api/questions/upvote/:id
// @desc    route for for upvoting
// @access  PRIVATE
router.post(
  "/upvote/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Question.findById(req.params.id)
          .then((question) => {
            if (
              question.upvotes.filter(
                (upvote) => upvote.user.toString() === req.user.id.toString()
              ).length > 0
            ) {
              /*var length = question.upvotes.length;

              for (var index = 0; index < length; index++) {
                if (question.upvotes[index].user == req.user.id) {
                  question.upvotes.splice(index, 1);
                }
              }
              */
              //return res.status(400).json({ noupvote: "Upvote got removed" });
              var index = question.upvotes
                .filter(
                  (upvote) => upvote.user.toString() === req.user.id.toString()
                )
                .indexOf();
              question.upvotes.splice(index, 1);
              return question
                .save()
                .then((question) => res.json(question))
                .catch((err) => console.log(err));
            }
            question.upvotes.unshift({ user: req.user.id });
            question
              .save()
              .then((question) => res.json(question))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);


// @type    GET
//@route    /api/questions/fetch/:user_id
// @desc    route for fetching all questions posted by the user
// @access  PUBLIC
router.get("/fetch/:user_id",
(req,res)=>{
  Question.find({user:req.params.user_id})
  .sort({date:"desc"})
  .then((questions)=>{
    return res.json(questions)
  }).catch(err=>console.log(err))
})

// @type    GET
//@route    /api/questions/:question_id
// @desc    route for fetching particular question 
// @access  PRIVATE
router.get("/:question_id",
(req,res)=>{
  Question.findOne({_id:req.params.question_id})
  .then((question)=>{
   res.json(question)
  }).catch(err=>console.log(err))
})


// @type    POST
//@route    /api/questions/edit/:question_id
// @desc    route for editing particular question posted by the user
// @access  PRIVATE
router.post("/edit/:question_id",
passport.authenticate("jwt",{session:false}),
(req,res)=>{
  
  const newValues={}
  newValues.user=req.user.id

  if(req.body.question) newValues.question= req.body.question

  Question.find({_id:req.params.question_id})
  .then((question)=>{
    if(question){
      Question.findOneAndUpdate(
        { _id: req.params.question_id },
        { $set: newValues },
        { new: true }).then((question)=>res.json(question))
        .catch((err)=>console.log("Problem in update "+err))
    }
  }).catch((err)=>console.log("Problem in fetching profile "+err))
})

// @type    DELETE
//@route    /api/questions/delete/:id
// @desc    route for for deleting a particular question posted by the user
// @access  PRIVATE

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Question.find({ user: req.user.id })
      .then(() => {
        Question.findOneAndRemove({ _id: req.params.id })
          .then(res.status(200).json({ message: "Question got deleted" }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
)


module.exports = router;
