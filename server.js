var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var session = require('express-session');
var server = app.listen(8000, function() {
    console.log("listening on port 8000");
   });
var io = require('socket.io').listen(server);

app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret: 'codingdojorocks'}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render("index");
});

io.sockets.on('connection', function (socket) {
  
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
  // all the server socket code goes in here
  socket.on( "posting_form", function (data){
    var forminfo = data.info;
    console.log(forminfo);    
    newinfo={};
    for(var i = 0; i < forminfo.length; i++){
        newinfo[forminfo[i].name] = forminfo[i].value;
    }
    var number = Math.floor(Math.random() * 1000) + 1
    socket.emit('updated_message', {res: newinfo });
    socket.emit("random_number",{res:number});
})

})


