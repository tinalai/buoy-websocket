import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = 8080;
const connections = [];

server.listen(PORT);
console.log('Server is running...');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', socket => {
  connections.push(socket);
  console.log(' %s sockets is connected', connections.length);
  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log(' socket id: ' + socket.id + ' disconnected');
    console.log(' %s sockets still connected', connections.length);
  });
});
