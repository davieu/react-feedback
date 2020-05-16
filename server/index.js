const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const app = express();

/*
makes passport aware that a new strategy is available
Creating a new instance of the GoogleStrat constructor
we put in an object with the keys as the first argument and a callback url.
2nd argument is the accesstoken function
*/
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken) => {
      console.log(accessToken);
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

const PORT = process.env.PORT || 5000;
app.listen(PORT);
