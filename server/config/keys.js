// keys.js - figure out what set of credentials to return
// we are in production -- return the prod set of keys
// module.exports = require('./prod');
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
  };
} else {
  module.exports = require('./dev');
}
