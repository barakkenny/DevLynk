const express = require('express');
const { profile, editProfile } = require('../controller/profile');
const { userAuth } = require('../middleware/auth')

const profileRouter = express.Router();

profileRouter.get('/view', userAuth, profile)
profileRouter.put('/edit', userAuth, editProfile)

module.exports = profileRouter;