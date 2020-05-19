// keys.js - figure out what set of credentials to return
/*
if (process.env.NODE_ENV === 'production') {
  // we are in production -- return the prod set of keys
  module.exports = require('./prod');
} else {
  // we are in development - return the dev keys
  module.exports = require('./dev');
}
*/
const { NODE_ENV: env } = process.env;

const config =
  env === 'production' ? require('./prod').default : require('./dev').default;

export default config;
