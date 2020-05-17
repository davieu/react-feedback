const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const app = express();

/*
makes passport aware that a new strategy is available
Creating a new instance of the GoogleStrat constructor
we put in an object with the keys as the first argument and a callback url.
2nd argument is the function that acquires the data given by oauth
Data that we asked for like the email and profile
*/
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken: ', accessToken);
      console.log('refreshToken: ', refreshToken);
      console.log('profile: ', profile);
    }
  )
);

/* 
route handler for when user clicks google oauth button.
1st arg is the route
2nd arg is passport.auth which tells passport what strategy to use ('google') and
also takes in an object with scope. The scope is what we want google to send us. in
this case the profile and email info. scope is part of google and their are many
scope options that they have.
*/
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

/*
This route is for when the user gives permission to give his/her account data. It is the callback for when the google code is given 
to google and google authenticates and gives back the user's profile
to our app server 
*/
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
