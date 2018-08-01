const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app)
let io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket)=>{
    console.log('new user connected to server');

    socket.on('disconnect', ()=>{
        console.log('seems to be a disconnect');
    });

    socket.on('createMessage', (message)=>{
        console.log('new message received', message);
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    
});


server.listen(PORT, ()=>{
    console.log(`app up on ${PORT}`)
});