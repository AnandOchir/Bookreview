const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: {type: String, unique: true},
  password: String,
  token: String,
  type: String
});

const Book = mongoose.model("User", UserSchema);

module.exports = Book;