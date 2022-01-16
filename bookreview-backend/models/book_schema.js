const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  // comments: [{ body: String }],
  date: { type: Date, default: Date.now }
});

BookSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'bookId'
})

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;