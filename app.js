var express=require('express'),
    http = require('http'),
    fs = require('fs'),
    path = require('path');
    exec = require('child_process').exec;
    sqlite3 = require('sqlite3');



var app = express();

// All your express server code goes here.
// ...
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
  console.log("New visiter");
  res.sendFile(__dirname + "/public/home.html");
});

module.exports = app;
