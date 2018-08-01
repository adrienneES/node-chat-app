// all es6 is removed so that script can run
//  in not just chrome browser
var socket = io(); 

socket.on('connect', function () {
    console.log('connected to server'); 

}); 

socket.on('disconnect', function () {
    console.log('client disconnected'); 
}); 

socket.on('newLocationMessage', function(data) {
    var li = jQuery('<li></li>'); 
    var a = jQuery('<a target="_blank">My current location</a>')
    li.text(`${data.from}: `);
    a.attr('href', data.url);
    li.append(a);
    jQuery('#messages').append(li); 

})
socket.on('newMessage', function(data) {
    console.log(`new newMessage${JSON.stringify(data, undefined, 2)}}`); 
    var li = jQuery('<li></li>'); 
    li.text(`from: ${data.from}; message: ${data.text}`)
    jQuery('#messages').append(li); 
}); 
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault(); 
    let messageTextbox = jQuery('[name=message]');
    console.log('button clicked'); 
    socket.emit('createMessage',  {
        from:'me', text:messageTextbox.val()
    }, function (data) {
        console.log('from server: ', data)
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(data) {
    if (!navigator.geolocation) {
        return alert('geolocation not supported by browser');
    }
    locationButton.attr('disabled', 'disabled').text('sending location ...');
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location');
    }, function (error) {
        alert ('unable to fetch lcoation');
        locationButton.removeAttr('disabled').text('Send Location');
    })
});