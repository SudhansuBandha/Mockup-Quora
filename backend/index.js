//require('dotenv').config({ path:"./.env"})

const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const path = require('path');
const config = require("./config/key");

//bringing all routes
const auth = require("./routes/api/auth");
const question = require("./routes/api/questions");
const profile = require("./routes/api/profile");
const answer = require("./routes/api/answers");
const search = require("./routes/api/search");
const comment= require("./routes/api/comment");
const following= require("./routes/api/following");
const activity = require("./routes/api/activity");
const like = require("./routes/api/like");

const app = express();


//Middleware configuration


app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


//Actual routes
app.use("/api/auth", auth);

app.use("/api/questions", question);
app.use("/api/profile", profile);
app.use("/api/answers", answer);
app.use("/api/search", search);
app.use("/api/comment",comment);
app.use("/api/following",following);
app.use("/api/activity",activity);
app.use("/api/like", like);

//mongoDB configuration
//const db = config.mongoURL;

//Attempt to connect to database
mongoose
  .connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./strategies/jsonwtStrategies")(passport);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("frontend/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
