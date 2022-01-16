const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  user: String,
  body: String,
  date: { type: Date, default: Date.now },
  bookId: { type: Schema.Types.ObjectId, ref: 'Book' }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;