var express=require('express'),
    http = require('http'),
    path = require('path'),
    cp = require('child_process');


var app = express();

var worker = cp.fork(__dirname + '/child.js');
worker.send({message: 'start'});
worker.on('log', function(log){
	console.log(log);
});

// All your express server code goes here.
// ...
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
  console.log("New visiter");
  res.sendFile(__dirname + "/public/home.html");
});


module.exports = app;
