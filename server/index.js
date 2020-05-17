const express = require('express');
// const or a variable not needed since we are simply just importing file
require('./services/passport');
const app = express();

// function from the routes/authRoutes file. app is used as the arg
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
