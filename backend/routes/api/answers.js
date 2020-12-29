require('dotenv').config({ path: '.env' });

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


//=================================
//             Answer
//=================================

// @type    POST
//@route    /api/answers/:id
// @desc    route for submitting answers to questions
// @access  PRIVATE

router.post(
    "/post/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
            
            const newAnswer = new Answer({
            user: req.user.id,
            answer: req.body.answer,
            question: req.params.id,
          });
          
  
          newAnswer
            .save()
            .then((answer) => res.json(answer))
            .catch((err) => console.log(err));
        }
    );

// @type    GET
//@route    /api/answers/fetch/:id
// @desc    route for fetching answer details of particular answer
// @access  PRIVATE

router.get(
    "/fetch/:id",
    (req, res) => {
        Answer.findOne({_id:req.params.id})
        .then((answer_details) => {
            if (!answer_details) {
              return res.status(404).json({ answernotfound: "No answer found" });
            }
            res.json(answer_details);
          })
        .catch((err)=>console.log(err))
        }
    );


// @type    GET
//@route    /api/answers/user_fetch/:user_id
// @desc    route for fetching all answers posted by the user
// @access  PUBLIC
router.get("/user_fetch/:user_id",
async (req,res)=>{
  const answers= await Answer.find({user:req.params.user_id}).populate("user").populate("question")
  .sort({date:"desc"})
    
  var i    
  let data=[]
  for (i in answers) {
       
      //let question_data= await Question.find({_id:answers[i].question})
      //let question=question_data[0].question
      
      //let user_data= await Person.find({_id:answers[i].user})
      //let user=user_data[0].username
      
      let id = answers[i]._id
      let answer=answers[i].answer
      let date =answers[i].date
    
      let resulting_date=""
      resulting_date=date_eval.date_evaluate(date)
      
      let downvotes=answers[i].downvotes
      let upvotes=answers[i].upvotes
      let comments=answers[i].comment      
     const object={
          id:id,
          answer:answer,
          date:resulting_date,
          question:answers[i].question.question,
          question_id:answers[i].question._id,
          downvotes:downvotes,
          upvotes:upvotes,
          comments:comments,
          user:answers[i].user.username,
          user_id:answers[i].user._id,
          description:answers[i].user.description,
          profilepic:answers[i].user.profilepic
      }
      
      data.push(object)
  
      
      }
      res.json(data)
          
})    


// @type    POST
//@route    /api/answers/edit/:answer_id
// @desc    route for editing particular answer posted by the user
// @access  PRIVATE
router.post("/edit/:answer_id",
passport.authenticate("jwt",{session:false}),
(req,res)=>{
  
  const newValues={}
  newValues.user=req.user.id

  if(req.body.answer) newValues.answer= req.body.answer

  Answer.find({_id:req.params.answer_id})
  .then((answer)=>{
    if(answer){
      Answer.findOneAndUpdate(
        { _id: req.params.answer_id },
        { $set: newValues },
        { new: true }).then((answer)=>res.json(answer))
        .catch((err)=>console.log("Problem in update "+err))
    }
  }).catch((err)=>console.log("Problem in fetching profile "+err))
})

// @type    DELETE
//@route    /api/answers/delete/:id
// @desc    route for for deleting a particular answer posted by the user
// @access  PRIVATE

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Answer.find({ user: req.user.id })
      .then(() => {
        Answer.findOneAndRemove({ _id: req.params.id })
          .then(res.status(200).json({ message: "Answer got deleted" }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);

// @type    GET
//@route    /api/answers/question/:id
// @desc    route for for fetching all answers of the question
// @access  PUBLIC
router.get(
  "/question/:question_id",
  async (req, res) => {
    
      answers= await Answer.find({question:req.params.question_id}).populate("user").populate("question")
      res.json(answers)
      /*let final_data=[]
      for (i in answers){
        let question = 
        let user = await Person.find({_id:answers[i].user})
        let date =answers[i].date
    
        let resulting_date=""
        resulting_date=date_eval.date_evaluate(date)
        
        let obj={
          id:answers[i]._id,
          question:question,
          answer:answers[i].answer,
          user:user,
          upvotes:answers[i].upvotes,
          downvotes:answers[i].downvotes,
          comment:answers[i].comment,
          date:resulting_date
        }
        final_data.push(obj)
      }
      
      
      res.json(final_data)


    */}

  );






module.exports = router;  