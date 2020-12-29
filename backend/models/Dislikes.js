const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'myPerson'
   },
   answerId: {
       type: Schema.Types.ObjectId,
       ref: 'myAnswer'
   },
   

}, { timestamps: true, versionKey:false})


module.exports = { DisLike }= mongoose.model('DisLike', dislikeSchema);

