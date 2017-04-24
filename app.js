var express=require('express'),
    http = require('http'),
    fs = require('fs'),
    path = require('path');
    exec = require('child_process').exec;
    sqlite3 = require('sqlite3');

sqlite3.verbose();
var db = new sqlite3.Database('sqlite3.db');
function readAllRows() {
    console.log("Read AllRows");
    db.all("SELECT id, content, title, description FROM blog_blogpost", function(err, rows) {
	rows.forEach(function(row) {
	    console.log(row.id + ": " + row.title);	
	});
    
    
    });

}

var app = express();

// All your express server code goes here.
// ...
app.use(express.static(path.join(__dirname, 'public')));

app.get('/regisiter', function(req, res) {
  console.log("register sensor");
/*
  fs.open("test.txt","w",0644,function(e,fd){
    if(e) throw e;
    fs.write(fd,"first fs!",0,'utf8',function(e){
        if(e) throw e;
        fs.closeSync(fd);
    })
  });
*/
  exec('reg-test r',
     function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
	   console.log('exec error: ' + error);
	}
     });
  res.send("");
});

app.get('/unregisiter', function(req, res) {
  console.log("unregster sensor");
/*
  fs.unlink("test.txt");
  res.send("");
*/
  exec('reg-test u',
     function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
	   console.log('exec error: ' + error);
	}
     });
});

app.get('/send', function(req, res) {
  console.log(req.query.data);
  exec('reg-test ' + req.query.data,
     function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
	   console.log('exec error: ' + error);
	}
     });

  res.send("");
});

app.get("/", function(req, res) {
  console.log("New visiter");
  res.sendFile(__dirname + "/public/home.html");
});

app.get("/data", function(req, res) {
  console.log("data coming");
  exec('reg-test g',
     function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
           console.log('exec error: ' + error);
           res.send("{}");
        } else {
           res.send(stdout);
        }
     });
});
module.exports = app;
