const socket = io();

socket.on('connect', function () {
    console.log('Connected to server')
})

socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('HH:mm');
    var template = document.querySelector('#message-template').text;
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    document.querySelector('#messages').innerHTML += html;
})

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('HH:mm')
    var template = document.querySelector('#location-message-template').text;
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    })

    document.querySelector('#messages').innerHTML += html;
})

document.querySelector('#message-form').addEventListener('submit', function (e) {
    e.preventDefault();

    var messageTextBox = document.querySelector('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.value
    }, function () {
        messageTextBox.value = '';
    })
})

var locationButton = document.querySelector('#send-location');

locationButton.addEventListener('click', function () {
    locationButton.textContent = 'Sending...';
    locationButton.setAttribute('disabled', true);

    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function () {
            locationButton.textContent = 'Send Location';
            locationButton.removeAttribute('disabled');
        })
    }, function () {
        alert('Unable to fetch location');
        locationButton.textContent = 'Send Location';
        locationButton.removeAttribute('disabled');
    })
})
