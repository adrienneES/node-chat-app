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
    let timeMessage = moment(data.createdAt).format('h:mm a');
    let template = jQuery('#locationMessage-template').html();
    let html = Mustache.render(template, {text: data.text, from: data.from, createdAt:timeMessage, url: data.url })
    jQuery('#messages').append(html);
})
socket.on('newMessage', function(data) {
    let template = jQuery('#message-template').html();
    let formattedTime = moment(data.createdAt).format('h:mm a');
    let html = Mustache.render(template, {text: data.text, from:data.from,
    createdAt: formattedTime});

    jQuery('#messages').append(html);
}); 
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault(); 
    let messageTextbox = jQuery('[name=message]');
    console.log('button clicked'); 
    socket.emit('createMessage',  {
        from:'user', text:messageTextbox.val()
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
        console.log(`lat: ${position.coords.latitude}; long ${position.coords.longitude}`);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location');
    }, function (error) {
        alert ('unable to fetch lcoation');
        locationButton.removeAttr('disabled').text('Send Location');
    });
});