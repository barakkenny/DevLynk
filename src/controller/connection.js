const ConnectionRequest = require('../models/connectionRequest')
const User = require('../models/user')

async function connectionRequest(req, res) {
    try{
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ['ignored', 'interested'];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message:  `Invalid status type: ${status}`
            })
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({
                success: false,
                message: 'User not found',
            })
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
           $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId },
           ]
        })

        if(existingConnectionRequest){
            return res.status(400).json({
                success: false,
                message: "Connection request already exist!",
            })
        }

        const connectionRequests = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequests.save();

        res.status(201).json({
            success: true,
            message: "Connection request sent successfully",
            data,
        })
        
    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {connectionRequest};