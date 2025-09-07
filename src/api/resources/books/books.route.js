
const express = require('express');


const booksController = require('./books.controller');


const booksRouter = express.Router();


booksRouter
  .route('/')
  .get(booksController.getBooks)
  .post(booksController.createBook);

booksRouter
  .route('/:id')
  .get(booksController.getBook)
  .put(booksController.updateBook)
  .delete(booksController.deleteBook);

module.exports = booksRouter;