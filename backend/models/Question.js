const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myPerson",
  },
  question: {
    type: String,
    required: true,
  },
   date: {
    type: Date,
    default: Date.now,
  },
  type:{
    type:String,
    default:"question"
  }
},

{
  versionKey:false
});

module.exports = Question = mongoose.model("myQuestion", QuestionSchema);
