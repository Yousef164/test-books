const express = require('express')

const booksRouter = require('./resources/books/books.route')
const authRouter = require('./resources/auth/auth.route');

const restRouter = express.Router();

restRouter.use('/books', booksRouter)

restRouter.use('/auth', authRouter);

module.exports = restRouter;