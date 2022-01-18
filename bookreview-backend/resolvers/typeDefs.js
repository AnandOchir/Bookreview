const { gql } = require('apollo-server');

module.exports = gql`
  scalar Upload

  type File {
    filename: String
    mimetype: String
    encoding: String
  }

  type Comment {
    _id:String
    body:String
    user:String
  }

  type Book {
    _id: String
    title: String
    author: String
    body: String
    comments: [Comment]
  }

  type User {
    _id: String
    username: String
    password: String
    email: String
    token: String
    type: String
  }

  type Query {
    books: [Book]
  }

  type BookReturnType {
    data: String
    responseStatus: String
  }

  type CommentReturnType {
    data: String
    responseStatus: String
  }

  type UserReturnType {
    data: String
    responseStatus: String
  }

  type Mutation {
    singleUpload(file: Upload!): File!

    addBook(title: String, author: String, body: String, image: Upload): BookReturnType

    addComment(bookId: String, user: String, body: String): BookReturnType

    updateBook(
      bookId: String
      title: String
      author: String
      body: String
    ): BookReturnType

    deleteBook(bookId: String): BookReturnType

    updateComment(
      commentId: String
      user: String
      body: String
    ): CommentReturnType

    deleteComment(commentId: String): CommentReturnType

    addUser(
      username: String
      email: String
      password: String
      token: String
    ): User

    login(
      email: String
      password: String
    ): User
  }
`