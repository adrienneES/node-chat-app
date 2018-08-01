// all es6 is removed so that script can run
//  in not just chrome browser
var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

});

socket.on('disconnect', function () {
    console.log('client disconnected');
});

socket.on('newMessage', function(data) {
    console.log(`new newMessage${JSON.stringify(data, undefined, 2)}}`);
});
