const express = require('express')
const router  = express.Router();
const Message = require('../Models/messageModel')
const verify = require('./verifyToken');
const Chat = require('../Models/chatModel');
const User = require('../Models/userModel')

// fetching all messages
router.get('/:ChatId', verify, async(req, res) =>{

   try {
    let allMessages = await Message.find({chat : req.params.ChatId})
    .populate('sender', "email name")
    .populate('receiver')
    .populate("chat")
    return res.status(201).json(allMessages)
   } catch (error) {
    return res.status(400).json('error in feting all messages')
   }
})



// for seding message
router.post('/', verify, async (req, res) =>{
    const {content, chatId} = req.body;

    if(!content || ! chatId){
        return res.status(400).json('incomplete info')
    }
    var newmessage = {
        sender:req.user.id,
        content : content,
        chat:chatId,
    }

    try{
            let msg = new Message(newmessage);
            msg.save();
            msg = await msg.populate('sender', 'name')
            // msg = await msg.populate('reciever')
            msg = await msg.populate('chat')

            msg = await User.populate(msg, {
                path: "chat.users",
                select: "name email",
              });

            let updatedChat = await Chat.findByIdAndUpdate(req.body.chatId, {latestMessage : msg});
            updatedChat.save();

            return res.status(201).json(msg)
    }catch(err){
       return res.status(400).json('error in seding messages')
    }
})


module.exports = router