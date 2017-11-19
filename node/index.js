var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', client => {
  client.emit('user_connected');
  console.log('Client connected...');

  client.on('join_chat', username => {
    client.username = username;
    console.log(`${username} joined the chat!`);
  });

  client.on('send_message', text => {
    const message = `${client.username}: ${text}`;

    client.broadcast.emit('message_received', message);
    client.emit('message_received', message);
    console.log(`${client.username} said: ${text}.`);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(8080);
