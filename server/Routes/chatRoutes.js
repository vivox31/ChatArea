const express = require('express');
const verify = require('./verifyToken');
const router = express.Router();
const Chat = require('../Models/chatModel')
const User = require('../Models/userModel')
const Message = require('../Models/messageModel')
// for accessing a chat
router.post('/', verify, async (req, res) => {
    const {userId} = req.body;
    if (!userId) {
        return res.status(400).json('userId params not match with request');
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user.id } } },
            { users: { $elemMatch: { $eq: userId } } },

        ],
    }).populate('users', '-password')
        .populate('latestMessage')

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email",
    });

    if (isChat.length > 0) {
       return res.send(isChat[0]);
    } else {
        let chatData = {
            ChatName: "sender",
            isGroupChat: false,
            users: [req.user.id, userId],
        };
        try {
            const newchat = new Chat(chatData);
            newchat.save();
            const fullChat = await Chat.findOne({ _id: newchat.id }).populate("users", "-password");
            return res.status(201).json(fullChat)
        } catch (err) {
            console.log(err);
           return  res.status(401).json('error in creating new chat')
        }
    }
})

// for fetching chats
router.get('/', verify, async (req, res) => {
    try {
        let results = await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });

        results = await User.populate(results, {
            path: "LatestMessage.sender",
            select: "name email"
        });
        return res.status(201).json(results)
    } catch (error) {
        res.status(400).json("error in fetching chats")
    }
})

// for fetching groups
router.get('/fetchGroups', verify, async (req, res) => {

    try {
        const allGroups = await Chat.find({ isGroupChat: true });
        res.status(201).send(allGroups);
    } catch (error) {
        res.status(400).json('error in fetching groups');
    }
})

// for creating groups
router.post('/createGroups', verify, async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).json({ message: "insufficiant data" });
    }

    var users = JSON.parse(req.body.users);
    users.push(req.user);

    try {
        const groupChat = new Chat({
            isGroupChat: true,
            users: users,
            ChatName: req.body.name,
            groupAdmin: req.user
        });
        groupChat.save();
        const fullgroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate('groupAdmin', '-password');
        res.status(201).json(fullgroupChat);
    } catch (error) {
        res.status(400).json("error in creating group")
    }
})

// for adding to group
router.post('/addToGroup', verify, async (req, res) => {

    const { chatId, userId } = req.body;

    const added = await Chat.findByIdAndUpdate(chatId, {
        $push: { users: userId },
    },
        { new: true }
    ).populate('users', '-password')
    .populate("groupAdmin", '-password')
    added.save();

    if(!added){
        return res.status(400).json('not able to add in group');
    }else{
        return res.status(201).json(added)
    }
})

router.delete('/:chatId',verify, async (req,res)=>{
    let chatid = req.params.chatId;
   try {
    await Message.deleteMany({chat:chatid});
    // message.save();
    await Chat.findByIdAndDelete(chatid);
    return res.json(201,'all messages and chat deleted successfullly')
   } catch (error) {
        console.log(err);
        return res.json(400,err);
   }
    
});

module.exports = router

