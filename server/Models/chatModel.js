const mongoose = require('mongoose')

const chatModelSchema = new mongoose.Schema({
    chatName: { type: String },
    isGroupChat: { type: Boolean },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },

    groupAdmin: {
           type:mongoose.Schema.Types.ObjectId,
           ref:'User'
    }
},{
    timestamps:true
})

const chat = mongoose.model('Chat',chatModelSchema)

module.exports = chat