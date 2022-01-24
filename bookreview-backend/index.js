const { ApolloServer } = require("apollo-server");
const express = require("express");
const mongoose = require("mongoose");

const { shield, rule, allow, deny, and } = require("graphql-shield");
const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("graphql-tools");

const query = require("./resolvers/query");
const mutation = require("./resolvers/mutation");
const typeDefs = require("./resolvers/typeDefs");
const permissions = require("./util/check-auth");

const BookModel = require("./models/book_schema");
const CommentModel = require("./models/comment_schema");
const UserModel = require("./models/user_schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

mongoose.connect(
  "mongodb+srv://AnandOchir:123457@cluster0.mgbf9.mongodb.net/BooksCollection?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const resolvers = {
  // Query
  Query: {
    // ...query
    books: async () => await BookModel.find().populate("comments"),
    getBookComments: async ( _ ,{ bookId })=>await CommentModel.find({bookId:bookId})
  },
  // Mutation
  Mutation: {
    // ...mutation
    async addBook(_, params, context) {
      // const user = checkAuth(context)
      const book = new BookModel(params);

      try {
        await book.save();
        return book;
      } catch (error) {
        return error;
      }
    },
    async addComment(_, { bookId, ...params }, context) {
      // const user = checkAuth(context)
      const comment = new CommentModel(params);
      comment.bookId = bookId;
      comment.save();
    },
    async updateBook(_, { bookId, ...params }, context) {
      // const user = checkAuth(context)
      console.log(bookId);
      await BookModel.updateOne(
        { _id: bookId },
        {
          ...params,
        }
      );
    },
    async deleteBook(_, { bookId }, context) {
      // const user = checkAuth(context)
      console.log(bookId);

      BookModel.deleteOne({ _id: bookId })
        .then(() => {
          console.log("Data deleted");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateComment(_, { commentId, ...params }, context) {
      // const user = checkAuth(context)
      console.log(commentId);
      await CommentModel.updateOne(
        { _id: commentId },
        {
          ...params,
        }
      );
    },
    async deleteComment(_, { commentId }, context) {
      // const user = checkAuth(context)
      console.log(commentId);

      CommentModel.deleteOne({ _id: commentId })
        .then(() => {
          console.log("Data deleted");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async addUser(_, { username, email, password }) {
      // if (!(email && password && username)) {
      //   throw error;
      // }

      let encryptedPassword = await bcrypt.hash(password, 10);
      encryptedPassword = encryptedPassword.toString();

      const user = new UserModel({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
        type: "default"
      });

      const token = jwt.sign({ user_id: user._id, email }, "secret", {
        expiresIn: "30m",
      });

      user.token = token;

      console.log(user);

      user.save();
      return user
    },
    async login(_, { email, password }) {
      const user = await UserModel.findOne({ email });

      if (bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ user_id: user._id, email }, "secret", {
          expiresIn: "30m",
        });

        user.token = token;
        console.log("login success " + user);
        return user;
      }
      throw new Error('password or email invalid')
    },
  },
};

const schema = makeExecutableSchema({typeDefs, resolvers})
const schemaWithMiddleware = applyMiddleware(schema, permissions)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaWithMiddleware,
  context: (ctx) => {
    let token = ctx.req.headers.authorization
    if(token ){
      token = token.replace('Bearer ', '')
      return {
        token
      };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});