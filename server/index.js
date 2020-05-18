const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// const or a variable not needed since we are simply just importing file
require('./models/User');
require('./services/passport');

// useNewUrlParser and useUnifiedTopology are to stop the errors in terminal
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.log('Error on start:' + err.stack));

const app = express();

// for using cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
// so app can use authentication and sessions
app.use(passport.initialize());
app.use(passport.session());

// function from the routes/authRoutes file. app object is used as the argument
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
