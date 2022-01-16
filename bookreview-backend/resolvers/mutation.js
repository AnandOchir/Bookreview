const checkAuth = require('../util/check-auth')
const BookModel = require("../models/book_schema");
const CommentModel = require("../models/comment_schema");
const UserModel = require("../models/user_schema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
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

        let encryptedPassword = await bcrypt.hash(password, 10)
        encryptedPassword = encryptedPassword.toString();

        const user = new UserModel({
            username: username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            "secret",
            {
                expiresIn: "30m",
            }
        );

        user.token = token;

        console.log(user)

        user.save();
    },
    async login(_, { email, password }) {

        const user = await UserModel.findOne({ email });

        if (bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { user_id: user._id, email },
                "secret",
                {
                    expiresIn: "30m",
                }
            );

            user.token = token;
            console.log('login success ' + token)
            return user
        }
    },
}