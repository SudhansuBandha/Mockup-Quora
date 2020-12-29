const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require("passport");

//Load Person Model
const Person = require("../../models/Person")


//Load Question Model
const Question = require("../../models/Question")

//Load Answer Model
const Answer = require("../../models/Answers");

// @type    GET
//@route    /api/search/
// @desc    route for search
// @access  PUBLIC


router.get('/:value', async (req,res)=>{
    
    const questions= await Question.find()
    const profiles= await Person.find()

    let i=0
    let data = []
    let final_data=[]
    for (i in questions){
        let obj ={
            id:questions[i].id,
            question:questions[i].question,
            type:"question"
        }
        data.unshift(obj)
    }
    for (i in profiles){
        let description=""
        if(profiles[i].description)
        description=profiles[i].description
        let obj ={
            id:profiles[i].id,
            username:profiles[i].username,
            image:profiles[i].profilepic,
            description:description,
            type:"user"
        }
        data.unshift(obj)
    }
    
    let value=req.params.value.toUpperCase()
    

   
     for (i in data){
        
        if(data[i].type==="user"){
            let username = data[i].username
            
            if(username.toUpperCase().startsWith(value)){
            final_data.unshift(data[i])
            
        }}
        if(data[i].type==="question"){
            let question = data[i].question
            
            if(question.toUpperCase().startsWith(value)){
            final_data.unshift(data[i])
            
        }}

    }
    
   if(final_data.length!==0) 
   return  res.json(final_data)
   else
   return res.json([])
})

router.get('/q/:value', async (req,res)=>{   
    
})


module.exports = router;  

