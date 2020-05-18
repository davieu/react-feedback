const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// const or a variable not needed since we are simply just importing file
require('./services/passport');
const app = express();
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.log('Error on start:' + err.stack));

// function from the routes/authRoutes file. app object is used as the argument
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
