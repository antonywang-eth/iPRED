/*
iPRED server end
TODO: the server right now responds to just socket connection.
*/
var express =require('express');
var app = express();

app.use(express.static(__dirname));

var http = require('http').Server(app);
var io = require('socket.io')(http);

var cfenv = require('cfenv');


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

var appEnv = cfenv.getAppEnv();

http.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});

var clients = [];

io.on('connection', function(socket) {
  socket.on('test', function(data) {
      io.to(socket.id).emit('testRespond','you said: '+data);
  });
});
