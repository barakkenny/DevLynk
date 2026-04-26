async function connectionRequest(req, res) {
    try{
        const fromUser = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

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