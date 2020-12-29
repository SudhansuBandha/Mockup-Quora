const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  description:{
    type: String,
  },
  profilepic: {
    type: String,
    default: "/images/User.jpg",
  },
  date: {
    type: Date,
    default: Date.now,
  }
},{
  versionKey:false
});

module.exports = Person = mongoose.model("myPerson", PersonSchema);
