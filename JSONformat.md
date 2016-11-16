### JSON documentation
#### corresponding parties:  app<->cloudServer<->raspberryPI

*app*
- login
{"name" : String "username",
 "password": base64string pwd,// not used for now
 "domain": String "sils2016"  // used for connecting to the server.
}

- check availability
{
  "username":"string",
  "room_id":"string",
  "time":{"begin":"","end":""}
}

- book room
{
  "username":"string",
  "room_id":"string",
  "time":{"begin":"","end":""}
}


*cloudServer*
*to app*
- login
{"status":ok || unauthorized,
 "info":{
 "username":String,
 "reservations":{
   "count":"1",
   "reservation":{
     "0":{
       "username":"string",
       "room_id":"string",
       "time":{"begin":"","end":""}
     }
   }
   },
 "online servers":{
   "count":"2",
   "rooms":{
      "0":{"name":"room", "status":"in_use/available","desc":"this room is ....","services":"string for pop up"},
      "1":{"name":"room", "status":"in_use/available","desc":"this room is ....","services":"string for pop up"}
           }
  }
 }
}

- check room/book room

{
  "status":"ok || failed",
  "room_id":"string",
  "time":{"begin":"","end":""}
}

*to raspberrypi*

- check availability

"check_status"
{
  "room_id":"string or null",
}

- book room
"book_room"
{
  "room_id":"string or null",
  "time":{"begin":"","end":""}
}

*raspberrypi*

- book room
"book_room"
{
  status:"ok/failed",
  "room_id":"string or null",
  "time":{"begin":"","end":""}
  "desc": "this room is ...",
  "services":"string for app popup"
}

"check_status"
{
  "room_id":"string or null",
  "time":{
    "0":{"begin":"","end":""},
    "1":{"begin":"","end":""},
  }
  "desc": "this room is ...",
  "services":"string for app popup"
}
