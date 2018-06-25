const socket = io();

socket.on('connect', function () {
    console.log('Connected to server')

    socket.emit('createMessage', {
        from: 'Jesoo',
        text: 'Qui su si sta freschi'
    })
})

socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
    console.log('New Message ', message) 
})