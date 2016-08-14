/*
iPRED server end
TODO: the server right now responds to just socket connection.
*/
var express =require('express');
var btoa = require('btoa');

var app = express();

// use basic id to verify access
// also websocket connectivity test key
const id = 'sils2016';

var encodedString = btoa(id);

app.use(express.static(__dirname));

var http = require('http').Server(app);
var io = require('socket.io')(http);

var cfenv = require('cfenv');


app.get('/', function(req, res){
  var req_id = req.query.id;
  if (req_id == encodedString){
  res.sendFile(__dirname + '/public/index.html');
}
});

var appEnv = cfenv.getAppEnv();

http.listen(appEnv.port, appEnv.bind, function() {
  console.log("server starting on " + appEnv.url);
});

var clients = [];

//verify connection query
io.use(function(socket, next){

  var queryID = socket.handshake.query.id;
    // return the result of next() to accept the connection.
  if (queryID == id) {
        console.log('connected!');
        return next();
  }

  console.log('rejected!');

  // call next() with an Error if you need to reject the connection.
  next(new Error('Authentication error'));
});

io.on('connection', function(socket) {
  socket.on('test', function(data) {
      io.to(socket.id).emit('testResponse','Connected!');
  });
});
