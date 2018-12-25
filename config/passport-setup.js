const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');
//creates the cookie 
passport.serializeUser((user, done) => {
    done(null, user);
})
//retrieve the id from the cookie
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        //check if the user that logs in exists in the database
        User.findOne({
            googleId: profile.id
        }).then((currentUser) => {
            //if the user exists
            if (currentUser) {
                console.log("user is: " + currentUser);
                done(null, currentUser);

            } else {
                new User({
                    googleId: profile.id,
                    username: profile.displayName
                }).save().then((newUser) => {
                    console.log('new user created: ', newUser);
                    done(null, newUser);
                });
            }
        })


    })
);