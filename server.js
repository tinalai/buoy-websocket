import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = 8080;

server.listen(PORT);
console.log('Server is running...');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
