const BookModel = require("../models/book_schema");

module.exports = {
    books: async () => await BookModel.find().populate('comments'),
}