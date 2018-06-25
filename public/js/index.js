const socket = io();

socket.on('connect', function () {
    console.log('Connected to server')
})

socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
    console.log('New Message ', message)
    var frag = document.createDocumentFragment();

    var li = document.createElement('li')
    li.textContent = `${message.from}: ${message.text}`

    frag.appendChild(li);
    document.querySelector('#messages').appendChild(frag)
})


document.querySelector('#message-form').addEventListener('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document.querySelector('[name=message]').value
    }, function () {

    })
})