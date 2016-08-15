/*
iPRED server end
TODO: the server right now responds to just socket connection.
*/
var express =require('express');
var btoa = require('btoa');

var app = express();

// use basic id to verify access
// also websocket connectivity test key
const id = '*******';

var encodedString = btoa(id);

var http = require('http').Server(app);
var io = require('socket.io')(http);

var cfenv = require('cfenv');

//serve two static folders for styling
app.use(express.static('public/images'));
app.use(express.static('public/stylesheets'));

// if user failed to provide valid if token, forbid access
app.use(function(req, res, next) {
  if (req.query.id != encodedString){
    console.log("use forbidden");
    return res.status(403).sendFile(__dirname +'/public/403.html');
  }
    next();
});

// serve static page
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
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
        console.log('Socket connected!');
        return next();
  }

  console.log('Socket rejected!');

  // call next() with an Error if you need to reject the connection.
  next(new Error('Authentication error'));
});

io.on('connection', function(socket) {
  socket.on('test', function(data) {
      io.to(socket.id).emit('testResponse','Connected!');
  });
});
