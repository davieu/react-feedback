const passport = require('passport');

// we are exporting a function from this file.
module.exports = (app) => {
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

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  /*
  when this route is called. It does the cookies process of
  serializing/deserializing and returning the user object
  Anytime req.user is used it refers to the logged in user
  */
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
