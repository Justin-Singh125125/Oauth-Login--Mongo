const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const profileRoutes = require("./routes/profile-routes");
const app = express();


//set up the view engine
app.set("view engine", "ejs");

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    //encrypts the cookie key with the hidden string that you made
    keys: [keys.session.cookieKey]
}))

//initialize passport, allows us to use our cookies
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURL, function () {
    console.log("Connected to mongodb");
});

//set up routes
app.use("/auth", authRoutes);
// for profile
app.use("/profile", profileRoutes);

//create home route
app.get("/", function (req, res) {
    res.render("home");
})

// server listens
app.listen(3000, function () {
    console.log("app listening on port 3000");
})