const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    question:{
        type: Schema.Types.ObjectId,
        ref: "myQuestion",
        required: true
    },
    user:{
      type:Schema.Types.ObjectId,
      ref:"myPerson",
      required:true
    },
    answer:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
      },
    type:{
        type:String,
        default:"answer"
      }  
},{
    versionKey:false
  })

module.exports = Answer = mongoose.model("myAnswer", AnswerSchema);
