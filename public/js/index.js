var socket = io(); 
socket.emit('room-list');
socket.on('show-rooms', function(rooms){
    console.log(`rooms: ${JSON.stringify(rooms, undefined, 2)}`);
    rooms.forEach(room=> {
        $('#roomList').append(
            $('<option></option>').val(room).html(room));    
        })
            
    });
function changeRoom(){
    $('#room').val($('#roomList').val());

}