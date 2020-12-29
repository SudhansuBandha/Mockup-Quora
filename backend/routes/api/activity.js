const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require("passport")
const date_eval=require("./evaluatedate")

//Load Question Model
const Question = require("../../models/Question")

//Load Answer Model
const Answer = require("../../models/Answers");

//=================================
//             Activity
//=================================

// @type    POST
//@route    /api/activity
// @desc    route for fetching latest activities
// @access  PUBLIC

router.post('/', async (req,res)=>{
    
    const questions= await Question.find().populate("user")
    const answers = await Answer.find().populate("user").populate("question")
    const length = questions.length + answers.length
    
    let final_data=[]
    var i=0;
    var ctr=0;

    for (i in questions){
        final_data.push(questions[i])
    }

    for ( i in answers){
        final_data.push(answers[i])
    }
    function sortByProperty(property){  
        return function(a,b){  
           if(a[property] > b[property])  
              return 1;  
           else if(a[property] < b[property])  
              return -1;  
       
           return 0;  
        }  
     }
     final_data.sort(sortByProperty("date")).reverse()
     
    
        
    res.json(final_data)
})


//@type     POST
//@route    /api/activity/:id
// @desc    route for fetching top 3 activites
// @access  PUBLIC

router.post('/:profile_id', async (req,res)=>{
    
    const questions= await Question.find({user:req.params.profile_id}).populate("user")
    const answers = await Answer.find({user:req.params.profile_id}).populate("user").populate("question")
    const length = questions.length + answers.length
    
    let final_data=[]
    var i=0;
    var ctr=0;

    for (i in questions){
        final_data.push(questions[i])
    }

    for ( i in answers){
        final_data.push(answers[i])
    }
    function sortByProperty(property){  
        return function(a,b){  
           if(a[property] > b[property])  
              return 1;  
           else if(a[property] < b[property])  
              return -1;  
       
           return 0;  
        }  
     }
     final_data.sort(sortByProperty("date")).reverse()
    
    temp_data=final_data
    final_data=[]
    //console.log(temp_data)
    
   
    for(i in temp_data){
        if(i>2) break
        final_data[i]=temp_data[i]
        

    } 
    res.json(final_data)
})


//@type     POST
//@route    /api/activity/date/:date
// @desc    route for fetching top 3 activites
// @access  PUBLIC
router.get('/date/:date',
(req,res)=>{
    res.json(date_eval.date_evaluate(req.params.date))    
})

module.exports = router;
