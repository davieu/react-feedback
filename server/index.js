const express = require('express');
const GoogleStrategy = require('passport-google-oath20').Strategy;
const app = express();

app.get('/', (req, res) => {
  res.send({hi: 'there'});
});

// makes passport aware that a new strategy is available
// Creating a new new instance of the GoogleStrat constructor
passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);





