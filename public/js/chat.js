var socket = io();

function scrollToBottom() {
    var message = jQuery('#messages');
    var newMessage = message.children('li:last-child');
    var clientHeight = message.prop('clientHeight');
    var scrollTop = message.prop('scrollTop');
    var scrollHeight = message.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        message.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/'
        } else {
            console.log('no error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
    var ul = jQuery('<ul></ul>')

    users.forEach(function (user) {
        ul.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ul);
});

socket.on('newMessage', function(msg) {
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text:msg.text,
        from: msg.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
   
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    console.log(html);
    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]')

    socket.emit('createMessage', {
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (pos) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.')
    });
});

