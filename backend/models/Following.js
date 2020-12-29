const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followingSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'myPerson'
    },
    userTo : {
        type: Schema.Types.ObjectId,
        ref: 'myPerson'
    },
    type:{
        type:String,
        required:true
    },
    answerTo: {
        type: Schema.Types.ObjectId,
        ref: 'myAnswer'
    },
    questionTo: {
        type: Schema.Types.ObjectId,
        ref: 'myQuestion'
    },
    

}, { timestamps: true,
     versionKey:false 
 }
)



module.exports =  Following = mongoose.model("Following", followingSchema)