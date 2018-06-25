const socket = io();

function scrollToBottom () {
    //Selector
    var messages = document.querySelector('#messages');
    var newMessage = messages.children[messages.children.length-1];
    var lastMessage = newMessage.previousElementSibling;
    //Heights
    var clientHeight = messages.clientHeight;
    var scrollTop = messages.scrollTop;
    var scrollHeight = messages.scrollHeight;
    var newMessageHeight = newMessage.clientHeight;
    var lastMessageHeight = lastMessage ? lastMessage.clientHeight : 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTo(0, scrollHeight);
    }
}

socket.on('connect', function () {
    var urlInfo = new URLSearchParams(window.location.search);
    var params = {
        name: urlInfo.get('name'),
        room: urlInfo.get('room')
    };

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    })
})

socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

socket.on('updateUserList', function (users) {
    var usersList = document.querySelector('#users');
    
    var frag = document.createDocumentFragment();

    const ol = document.createElement('ol');
    
    users.forEach(function (user) {
        var li = document.createElement('li')
        li.textContent = user;
        ol.appendChild(li)
    })

    frag.appendChild(ol);

    while (usersList.firstChild) {
        usersList.removeChild(usersList.firstChild)
    }

    usersList.appendChild(frag);
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('HH:mm');
    var template = document.querySelector('#message-template').text;
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    document.querySelector('#messages').innerHTML += html;
    scrollToBottom();
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
    scrollToBottom();
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
