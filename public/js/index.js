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

socket.on('newLocationMessage', function (message) {
    var frag = document.createDocumentFragment();

    var li = document.createElement('li')
    
    var a = document.createElement('a');
    a.textContent = 'My current location';
    a.setAttribute('target', '_blank');
    a.setAttribute('href', message.url);
    
    li.textContent = `${message.from}: `;
    li.appendChild(a);

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

var locationButton = document.querySelector('#send-location');
locationButton.addEventListener('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        alert('Unable to fetch location');
    })
}) 