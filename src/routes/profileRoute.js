const express = require('express');
const { viewProfile, editProfile } = require('../controller/profile');
const { userAuth } = require('../middleware/auth')

const profileRouter = express.Router();

profileRouter.get('/view', userAuth, viewProfile)
profileRouter.patch('/edit', userAuth, editProfile)

module.exports = profileRouter;