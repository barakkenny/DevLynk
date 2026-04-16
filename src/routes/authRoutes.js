const express = require('express');
const { signUp, signIn, signOut } = require('../controller/auth');

const authRouter = express.Router()

authRouter.post('/register', signUp);
authRouter.post('/login', signIn)
authRouter.post('/logout', signOut)

module.exports = {
    authRouter
}