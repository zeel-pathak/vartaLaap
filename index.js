const express = require('express');
const app = require('express')();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

// Routing
app.use(express.static(path.join(__dirname, '/')));

io.on('connection', (socket) => {

    socket.once('connection', (Alert) => {
      io.emit('connection',Alert);
    });

     socket.on('chat message', (msg) => {
       io.emit('chat message', msg);
     });

  //   socket.on("disconnect", function (){ 
  //       var dis = 'user disconnected'
  //       io.emit('chat message', (dis))
  //     });
 });

http.listen(3000, () => {
  console.log('listening on *:3000');
});