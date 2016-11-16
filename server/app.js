'use strict'
/*
smartSILS server end
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

// serve static page
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

var appEnv = cfenv.getAppEnv();

http.listen(appEnv.port, appEnv.bind, function() {
  console.log("server starting on " + appEnv.url);
});

// preConfigured clients to use the app, act as the clients database
var clients = {"Zhenwei":{"name":"Zhenwei","uid":"","bookingCount":0,"notification":1,"showEquip":1,"highlightPre":0},
               "Steven":{"name":"Steven","uid":"","bookingCount":1,"notification":1,"showEquip":1,"highlightPre":0},
               "Lucy":{"name":"Lucy","uid":"","bookingCount":2,"notification":0,"showEquip":0,"highlightPre":1},
               "Jeffery":{"name":"Jeffery","uid":"","bookingCount":4,"notification":0,"showEquip":1,"highlightPre":0},
            };

// use two rooms for testing purpose, act as a database.
var servers = {"VRroom":{"name":"VRroom","uid":"","available":"true","online":false,'major':'','minor':''},
               "Manning14":{"name":"Manning14","uid":"","available":"true","online":false,'major':'','minor':''},
             };

// reservation storage, use array.push to add new reservations.
// each reservation: {'username':'Zhenwei','room':'VRroom','detail':{'timeStamp':'11','date':'2016-10-17'}}
var reservations = {"VRroom":[],
                    "Manning14":[],
                  };

// socket management
// expected functions: handle login, reserve, checkin, logoff

io.on('connection', function(socket) {

  // handle login
  socket.on('login', function(data) {
        // data example:
        // {"username":"VRroom","type":"room-server"}
        // {"username":"Zhenwei","type":"client"}

        // check service type

        // if server inplace
        if (data.type=="room-server"){

          // if server is a registered one
          if (servers.hasOwnProperty(data.username)){
            console.log("server "+data.username+" is online");

            // set server stats as online
            servers[data.username].online =true;

            // store socket id
            servers[data.username].uid = socket.id;

            // and broadcast new server list.
            io.emit('servers',{'servers':servers})
          }
        }


        // if client is connected
        else if (data.type == 'client'){

          if (clients.hasOwnProperty(data.username)){
              console.log("client "+data.username+" is online");

              // store socket id
              clients[data.username].uid = socket.id;

              // grant access, and send server list
              io.to(socket.id).emit('onlogin',{'username':data.username,'status':'granted'});
              io.emit('servers',{'servers':servers})
          }

          else{
            io.to(socket.id).emit('onlogin',{'username':data.username,'status':'rejected'});
          }
        }

  });

  // handle reserve
  socket.on('reserve',function(data){
    // example: {'username':'Zhenwei','room':'VRroom','detail':{'timeStamp':'11','date':'2016-10-17'}}

    console.log(data.username+" tries to reserve a room");

    // if username is valid
    if (clients.hasOwnProperty(data.username)){
        var currRoomReservations = reservations[data.room];
        var booked=false;
        var userID = clients[data.username].uid;

        //check existing reservation
        for (var i = 0;i < currRoomReservations.length; i++){

          // if already reserved
          if (currRoomReservations[i].timeStamp == data.detail.timeStamp && currRoomReservations[i].date == data.detail.date ){
              booked=true;
          }
        }
        // if not booked before
        if (booked==false){
          // booked for client
          reservations[data.room].push(data.detail);

          // send succeed info
          io.to(userID).emit('onreserve',{'status':'succeed','detail':data.detail});
        }
        else if (booked==true){
          // send failed info
          io.to(userID).emit('onreserve',{'status':'failed','detail':null});
        }
    }


    // invalid user
    else{
      io.to(socket.id).emit('onreserve',{'status':'failed','detail':null});
    }
});

  // handle checkin
  // user -> server , server-> user  server->roomServer
  socket.on('checkin',function(data){
    // data format: {'username':'Zhenwei','timeStamp':'11','date':'2016-10-17','major':'','minor':''};
    // check major and minor info
    for (var room in servers){
      // if the room is found
      if (servers[room].major == data.major && servers[room].minor == data.minor){
          // fetch the reservation
          var roomName = server[room].name;
          var roomUID = server[room].uid;

          // search reservation
          // example reservation: {'username':'Zhenwei','room':'VRroom','detail':{'timeStamp':'11','date':'2016-10-17'}}
          for (var j =0; j<reservations['roomName'].length;j++){

              // if found reservation
              if (roomName==reservations['roomName'][i].room && reservations['roomName'][i].username ==data.username && reservations['roomName'][i]['detail'].date == data.date && reservations['roomName'][i]['detail'].timeStamp == data.timeStamp){
                    // shoot info to server
                    io.to(roomUID).emit('checkinserver',{'username':data.username,status:'succeed'});
                    // tell user he's online.
                    io.to(socket.id).emit('oncheckin',{'status':'succeed','room':roomName});

              }
              // if reservation is invalid
              else{
                  // tell user he failed to checkin.
                  io.to(socket.id).emit('oncheckin',{'status':'failed','room':roomName});
                  // let sever notify user he failed.
                  io.to(roomUID).emit('checkinserver',{'username':data.username,status:'failed'});
              }
          }
      }
    }

  });


  // handle logoff
  socket.on('logoff',function(data){
    // data example {'username':'Zhenwei'};

    // clear the uid so user is unreachable
    clients[data.username].uid==null;

    // send back info to let user know logoff succeed.
    io.emit("onlogoff",{'username':data.username,'status':'succeed'});

  });

});
