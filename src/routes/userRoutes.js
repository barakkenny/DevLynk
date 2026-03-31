const express = require('express');
const { signUp, signIn } = require('../controller/user');

const authRouter = express.Router()

authRouter.post('/register', signUp);
authRouter.post('/login', signIn)

module.exports = {
    authRouter
}