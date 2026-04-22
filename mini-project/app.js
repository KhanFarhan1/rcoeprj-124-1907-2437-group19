//env
require("dotenv").config();

//npm package
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const flash = require("connect-flash");

const app = express();
const port = 8080;

//router
const createrideRoute = require("./router/createride.js");
const ridestatusRoute = require("./router/ridestatus.js");
const bookingRoute = require("./router/booking.js");
const bookedridesRoute = require("./router/bookedrides.js");
const searchRoute = require("./router/search.js");
const userRoute = require("./router/user.js");

//model
const user = require("./model/user");
const ride = require("./model/ride");
const book = require("./model/book");

//ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("ejs", ejsMate);

//session
const sessionOption = {
  secret: process.env.SECERT,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOption));
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());
//passport-local
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//to get some varible in local resources
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.failure = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

//moogoose FOR LOCAL
const local_url = "mongodb://127.0.0.1:27017/mini-project";
//mongoose FOR ATLAS
const db_url = process.env.ATLAS_URL;

async function main() {
  await mongoose.connect(db_url);
}

main()
  .then(() => {
    console.log("Database is working!!");

    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

//Backend Start

//user
app.use("/", userRoute);

//createride
app.use("/createride", createrideRoute);

//ridestatus
app.use("/ridestatus", ridestatusRoute);

//booking
app.use("/booking", bookingRoute);

//bookedride
app.use("/bookedrides", bookedridesRoute);

//search
app.use("/search", searchRoute);

//review
app.get("/review/:id", (req, res) => {
  res.send("Review From!!!");
});

//home-page
app.get("/", async (req, res) => {
  let all_ride = await ride.find({}).populate("driver");
  let currUser = req.user;
  let currTime = new Date();
  console.log(currUser);
  res.render("user/home", { all_ride, currTime, currUser });
});

app.get("/privary", (req, res) => {
  res.render("extra/privary.ejs");
});
app.get("/term", (req, res) => {
  res.render("extra/termandcondition.ejs");
});
