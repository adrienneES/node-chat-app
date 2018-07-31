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
    console.log('new user connected ');

    socket.on('disconnect', ()=>{
        console.log('seems to be a disconnect');
    })
})

server.listen(PORT, ()=>{
    console.log(`app up on ${PORT}`)
});