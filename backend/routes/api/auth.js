const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jswt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/url");

// @type    GET
//@route    /api/auth
// @desc    just for testing
// @access  PUBLIC
router.get("/", (req, res) => res.json({ test: "Auth is succesful" }));
const Person = require("../../models/Person");
const { json } = require("body-parser");
const jsonwtStrategies = require("../../strategies/jsonwtStrategies");


// @type    GET
//@route    /api/auth/verify_email
// @desc    route for checking whether email is present or not
// @access  PUBLIC
router.post("/verify_email",(req,res)=>{
  const email= req.body.email
  Person.findOne({email}).then((person)=>{
      if(person!=null)
      return res.json({errormessage:"Email is registered in our system" })
  })
  .catch((err)=>{console.log(err)})
})

// @type    POST
//@route    /api/auth/register
// @desc    route for registration of users
// @access  PUBLIC
router.post("/register", (req, res) => {
  
  Person.findOne({
    email: req.body.email,
  })
    .then((person) => {
      if (person) {
        return res
          .status(400)
          .json({ emailerror: "Email is already registered in our system" });
      } else {
        const newPerson = new Person({
          username: req.body.uname,
          email: req.body.email,
          password: req.body.password,
        });
        
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPerson.password, salt, (err, hash) => {
            if (err) throw err;
            newPerson.password = hash;
            newPerson
              .save()
              .then((person) => res.json(person))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(error));
});

// @type    POST
//@route    /api/auth/login
// @desc    route for login of users
// @access  PUBLIC

router.post("/login", (req, res) => {
  console.log("reached login")
  const email = req.body.email;
  const password = req.body.password;
  Person.findOne({ email })
    .then((person) => {
      if (!person) {
        return res.status(404).json({
          emailerror: "User not found with the email",
        });
      }
      bcrypt
        .compare(password, person.password)
        .then((isCorrect) => {
          if (isCorrect) {
            //use payload and create token for user
            //res.json({ success: "Logged in" });

            const payload = {
              id: person.id,
              username: person.username,
              email: person.email,
            };
            jswt.sign(
              payload,
              key.secret,
              { expiresIn: 24*3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                  username:person.username,
                  id:person.id
                });
              }
            );
          } else {
            res.status(400).json({ passworderror: "Enter correct password" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;
