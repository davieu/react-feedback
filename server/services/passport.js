const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// pull a model out of mongoose to use
const User = mongoose.model('users');

// makes cookie
passport.serializeUser((user, done) => {
  // done(null means everything is okay, refers to the mongoDB ID instance not google profile ID)
  /*
  It is better to refer it to the mongoDB ID because if you might have
  other OAUTH IDs for FB or twitter so it's better to refer to mongo ID
  // the user.id (mongoID instance) will be turned into cookie
  */
  done(null, user.id);
});

// the cookie will be deserialized to see who is the user. turn the ID back into a mongoID instance
passport.deserializeUser((id, done) => {
  // finds the user by MongoID which was deserialized by passport
  User.findById(id).then((user) => {
    done(null, user);
  });
});

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
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // have existing record with the given profile ID
          // done(null is for everything is fine, user record)
          console.log('already have this record ID');
          done(null, existingUser);
        } else {
          // dont have the user record with this ID, create new record
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
