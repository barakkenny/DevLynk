const express = require('express');
const { connectionRequest} = require('../controller/connection');
const { userAuth } = require('../middleware/auth')

const connectionRouter = express.Router();

connectionRouter.post('/send/:status/:toUserId', userAuth, connectionRequest);

module.exports = connectionRouter;