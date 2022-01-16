const jwt = require("jsonwebtoken");
const { shield } = require("graphql-shield");

const checker = (context, resolve) => {
  console.log("aaaab");
  // console.log('aaaaaaaaaa: ', context.req)
  const { token } = context;

    // console.log('token: ', token)
    if (token) {
      try {
        const user = jwt.verify(token, "secret");

        return resolve(user);
      } catch (err) {
        throw new Error("Invalid/Expired token");
      }
    }
    throw new Error("Auth error2");
};

const permisions = shield({
  Query: {
    // books: checker,
  },
  Mutation: {
    addBook: checker,
    // addComment: checker,
    updateBook: checker,
    deleteBook: checker,
    // updateComment: checker,
    deleteComment: checker
  },
});

module.exports = permisions;
