const express = require('express');
const connectionRequest = require('../controller/profile');
const { userAuth } = require('../middleware/auth')

const connectionRouter = express.Router();

connectionRouter.get('/', userAuth, connectionRequest);

module.exports = connectionRouter;