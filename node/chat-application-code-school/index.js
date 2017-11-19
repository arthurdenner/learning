var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('redis').createClient();

const storeMessage = message => {
  message = JSON.stringify(message);

  if (message !== null) {
    redis.lpush('messages', message, (err, response) => {
      redis.ltrim('messages', 0, 9);
    });
  }
};

io.on('connection', client => {
  client.emit('user_connected');

  client.on('join_chat', username => {
    client.username = username;
    client.broadcast.emit('new_client', `${username} joined the chat!`);

    if (username !== null) {
      redis.smembers('users', (err, users) => {
        users.forEach(user => {
          client.emit('new_client', `${user} is on the chat!`);
        });
      });

      redis.sadd('users', username);

      redis.lrange('messages', 0, -1, (err, messages) => {
        messages = messages.reverse();

        messages.forEach(msg => {
          msg = JSON.parse(msg);

          const message = `${msg.user}: ${msg.text}`;

          client.emit('message_received', message);
        });
      });
    }
  });

  client.on('send_message', text => {
    const message = `${client.username}: ${text}`;

    client.broadcast.emit('message_received', message);
    client.emit('message_received', message);

    storeMessage({ user: client.username, text });
  });

  client.on('disconnect', name => {
    const username = client.username;
    const message = `${username} left the chat!`;

    client.broadcast.emit('client_left', message);

    if (username !== null) {
      redis.srem('users', username);
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(8080);
