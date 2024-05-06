const express = require('express')
const cors = require('cors')
const userRoutes = require('./Routes/userRoutes')
const chatRoutes= require('./Routes/chatRoutes')
const messageRoutes = require('./Routes/messageRoutes')
const server = require('socket.io')
const port = process.env.PORT || 8000;
const app = express();
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
dotenv.config();

//mongo db setup
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('successfully connected to DB')
}).catch((err)=>{
    console.log(err)
})


// server setup
app.listen(port, function(){
    console.log('server is running on port :',port )
})

// chat server setup
const httpServer = require('http').Server(app);
const io =  server(httpServer,{
    cors : {
        originn : "*",
    },
    pingTimeout : 60000,
});



 io.on('connection',(socket)=>{
    console.log('connection established');

    socket.on('setup', (user)=>{
        socket.join(user._id);
        socket.emit('connected');
        // console.log(user);
    });
    socket.on('join chat', (room)=>{
        socket.join(room);
        // console.log('joined room', room)
    });

    socket.on('new message', (newMessageStatus) => {
        var chat = newMessageStatus.chat;
        if(!chat.users){
            return console.log('chat.users not defined');
        }
        chat.users.forEach((user) =>{
            if(user._id == newMessageStatus.sender._id)return;
            socket.in(user._id).emit('message recieved', newMessageStatus);
        });
    });
});
httpServer.listen(3000);


app.get('/',(req,res)=>{
        res.json(201,'server is running!!!')
})
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/user",userRoutes)
app.use('/chat',chatRoutes)
app.use('/message',messageRoutes)
