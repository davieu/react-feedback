const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

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
