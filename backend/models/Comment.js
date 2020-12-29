const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'myPerson'
    }, 
    responseToId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    answerId: {
        type: Schema.Types.ObjectId,
        ref: 'myAnswer'
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
      }

}, { versionKey:false })


module.exports =  Comment  =  mongoose.model('Comment', commentSchema);