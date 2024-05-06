const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content : {
        type : String,
    },

    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chat'
    }

},{
    timestamps:true
})
const message = mongoose.model('Message',messageSchema);
module.exports = message