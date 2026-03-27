const express = require('express');
const { signUp } = require('../controller/user');

const authRouter = express.Router();

authRouter.post('/register', signUp);

module.exports = {
    authRouter
}