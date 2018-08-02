// all es6 is removed so that script can run
//  in not just chrome browser
var socket = io(); 
function scrollToBottom() {
    // selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');
    // heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight() || 0;
    let height = clientHeight + scrollTop + newMessageHeight + lastMessageHeight;
    // console.log(`height: ${height} clientHeight ${clientHeight} scrollTop ${scrollTop} newMessageHeight: ${newMessageHeight} lastMessageHeight ${lastMessageHeight}`);
    // console.log(`scrollHeight ${scrollHeight}`);
    if (height >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}
socket.on('connect', function () {
    let params = jQuery.deparam(window.location.search);
    params.name = params.name.trim();
    params.room = params.room.trim();
    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log(`${params.name} connected`);
        }
    });
}); 

socket.on('disconnect', function () {
    console.log('client disconnected'); 
}); 
socket.on('updateUserList', function(users) {
    var ol = jQuery('<ol></ol>');
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});
socket.on('newLocationMessage', function(data) {
    let timeMessage = moment(data.createdAt).format('h:mm a');
    let template = jQuery('#locationMessage-template').html();
    console.log(`data ${data}`);
    let html = Mustache.render(template, {text: data.text, from: data.from, createdAt:timeMessage, url: data.url })
    jQuery('#messages').append(html);
    scrollToBottom();
})
socket.on('newMessage', function(data) {
    let template = jQuery('#message-template').html();
    let formattedTime = moment(data.createdAt).format('h:mm a');
    console.log(`new message data ${JSON.stringify(data, undefined, 2)}`);
    let html = Mustache.render(template, {text: data.text, from:data.from,
    createdAt: formattedTime});

    jQuery('#messages').append(html);
    scrollToBottom();
}); 
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault(); 
    let messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage',  {
        text:messageTextbox.val()
    }, function (data) {
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
    });
});