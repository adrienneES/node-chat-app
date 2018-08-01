const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const {generateLocationMessage, generateMessage} = require('./utils/message');
const PORT = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app)
let io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket)=>{
    console.log('new user connected to server');
    socket.emit('newMessage', generateMessage('admin', 'welcome new user') );
    socket.broadcast.emit('newMessage', generateMessage('admin', `new user just joined`));

    socket.on('disconnect', ()=>{
        console.log('seems to be a disconnect');
    });

    socket.on('createMessage', (message, callback)=>{
        console.log('new message received', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords, cb)=>{
        console.log('got a location request');
        io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude))
    })
    
});


server.listen(PORT, ()=>{
    console.log(`app up on ${PORT}`)
});