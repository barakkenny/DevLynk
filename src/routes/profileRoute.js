const express = require('express');
const profile = require('../controller/profile');
const { userAuth } = require('../middleware/auth')

const profileRouter = express.Router();

profileRouter.get('/profile', userAuth, profile)

module.exports = profileRouter;