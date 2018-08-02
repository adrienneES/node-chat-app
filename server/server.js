const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const {isRealString} = require('./utils/validation');
const {generateLocationMessage, generateMessage} = require('./utils/message');
const {Users} = require('./utils/users');
const PORT = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app)
let io = socketIO(server);
var users = new Users();

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket)=>{
    console.log('new user connected to server');

    socket.on('join', (params, cb)=>{
        //validate data
        if (! isRealString(params.name) || ! isRealString(params.room)) {
            return cb('Name and Room are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id); // so no dups
        users.addUser(socket.id,params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('admin', `welcome to ${params.room} ${params.name}`) );
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} just joined`));
        console.log(`${params.name} joined ${params.room}`);
        cb();
    });

    socket.on('disconnect', ()=>{
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} left room`));
            console.log(`${user.name} left room`);
        }
        
    });

    socket.on('createMessage', (message, callback)=>{
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });

    socket.on('createLocationMessage', (coords, cb)=>{
        var user = users.getUser(socket.id);
        if (user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }
    });    
});


server.listen(PORT, ()=>{
    console.log(`app up on ${PORT}`)
});