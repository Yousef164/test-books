const express = require('express');

const authController = require('./auth.controller');

const authRouter = express.Router();

authRouter
  .route('/registration')
  .post(authController.register);


module.exports = authRouter;