var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  

io.on('connection', (socket) => {
    io.emit('chat message', 'connected');

    socket.on('disconnect', () => {
        io.emit('chat message', 'some one has been disconnected')
    })

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

io.emit('Connection message', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

http.listen(3000, () => {
  console.log('listening on *:3000');
});