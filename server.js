var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var clientInfo = {};

io.on('connection',function(socket)
     {
    
    socket.on("joinRoom",function(req)
    {
        socket.join(req.room);
        clientInfo[socket.id] = req;
        socket.broadcast.to(req.room).emit('message',{
            name:"System",
            text:req.name+" has Joined",
            timeStamp:moment.valueOf()
        })
    });
    
    socket.on("message",function(message)
             {
        console.log("message recieved:"+message.text);
        message.timeStamp = moment().valueOf();
        io.to(clientInfo[socket.id].room).emit("message",message);
        
    })
    
    console.log("user connected to socket.io");
    socket.emit("message", {
        text:"Welcome to chat app",
        timeStamp :moment().valueOf(),
        name:"System"
    });
});

app.use(express.static(__dirname+"/public"));
http.listen(PORT,function(){
   console.log("Server started"); 
});