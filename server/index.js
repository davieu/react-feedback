const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oath20').Strategy;

const app = express();

// makes passport aware that a new strategy is available. Creating a new instance of the GoogleStrat constructor
passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);


/*
CLIENT ID
904004713758-nbgert4no10khi5vhgiosjeba09tqo5n.apps.googleusercontent.com

CLIENT SECRET
WawVipnLlqxvcmSBalRzzZGg
*/


