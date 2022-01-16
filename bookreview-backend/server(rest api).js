const express = require('express')
const bodyparser = require('body-parser')

const app = express()
const port = 3000
const mongoose = require('mongoose');

const BookModel = require('./book_schema')

mongoose.connect('mongodb+srv://AnandOchir:123457@cluster0.mgbf9.mongodb.net/BooksCollection?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

app.use(bodyparser.json()); 

app.get('/', async (req, res) => {
    const books = await BookModel.find()
  res.send(books)
})

app.post("/add_book", async (req, res) => {
    console.log('aa', req.body)
    const book = new BookModel(req.body);
  
    try {
      await book.save();
      res.send(book);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})