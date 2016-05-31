var name = getQueryVariable("name") || 'Anomoyous';
var room = getQueryVariable("room");
var socket = io();
console.log(name+" "+room);
socket.on('connect',function()
         {
    console.log("connected to socket.io server!");
});

socket.on("message",function(message)
{
    var momentTimeStamp = moment.utc(message.timeStamp);
    console.log("New message:");
    console.log(message.text);
    var $messages = jQuery('.messages');
    
    $messages.append('<p><strong>'+message.name+" "+momentTimeStamp.local().format('h:mma')+"</strong></p>");

    $messages.append('<p>'+message.text+'</p>');
    
});

var $form = jQuery('#message-form');

$form.on('submit',function(event){
    event.preventDefault();
    socket.emit('message',{
        text:$form.find("input[name=message]").val(),
        name:name
    });
    $form.find("input[name=message]").val("");
});