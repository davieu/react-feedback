const mongoose = require('mongoose');

// Both are the same. { Schema } is destructured
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

// We created a mongoose user Schema
const userSchema = new Schema({
  googleId: String,
});

/*
1st arg: name of collection 'users', 2nd arg name of the Schema created userSchema
This is loading the model into mongoose
*/
mongoose.model('users', userSchema);
