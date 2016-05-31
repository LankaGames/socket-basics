var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection',function(socket)
     {
    
    socket.on("message",function(message)
             {
        console.log("message recieved:"+message.text);
        io.emit("message",message);
        
    })
    
    console.log("user connected to socket.io");
    socket.emit("message", {
        text:"Welcome to chat app"
    });
});

app.use(express.static(__dirname+"/public"));
http.listen(PORT,function(){
   console.log("Server started"); 
});