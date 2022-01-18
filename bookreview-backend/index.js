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

const {
  GraphQLUpload,
} = require('graphql-upload');
const { storeFile } = require("./store-file");

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
  Upload: GraphQLUpload,

  // Query
  Query: {
    // ...query
    books: async () => await BookModel.find().populate("comments"),
  },
  // Mutation
  Mutation: {
    // ...mutation
    singleUpload: async (_, { file }) => {
      console.log('back file: ', file)

      const fileId = await storeFile(file).then(result => result);
      // return true;

      return { 
        filename: "filename", 
        // mimetype: "mimetype",
        // encoding: "encoding"
      };
    },



    async addBook(_, params, context) {
      console.log('aaa: ', params)
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

// ...........

// const isAuthenticated = rule({ cache: "contextual" })(
//   async (parent, args, context, _info) => {
//     const result = !!context.user;
//     console.info(`isAuthenticated:${result}`);
//     return result;
//   }
// );

// const permisions = shield({
//   Query: {
//     books: deny,
//     // privateResolver: and(isAuthenticated, isAdmin)
//   },
//   Mutation: {
//     addBook: deny,
//     addComment: deny
//   },
// });

// const schema = applyMiddleware(
//   makeExecutableSchema({
//     typeDefs,
//     resolvers,
//   }),
//   permisions
// );

const schema = makeExecutableSchema({typeDefs, resolvers})
const schemaWithMiddleware = applyMiddleware(schema, permissions)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  schemaWithMiddleware,
  context: (ctx) => {
    let token = ctx.req.headers.authorization
    if(token ){
      token = token.replace('Bearer ', '')
      return {
        // mocking that there is no user currently in the context
        token
      };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// const apolloServer = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req, res }) => ({ req, res })
// });

// const start = async() => {
//   await apolloServer.start();
//   app.use(checkAuth);
//   apolloServer.applyMiddleware({ app });
// }

// start();

// app.listen({ port: 4000 }, () =>
//   console.log(
//     `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
//   )
// );

// app.listen({ url }, () =>
//   console.log(`🚀 Server ready at ${url}`)
// );

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => ({ req })
// });

// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });
