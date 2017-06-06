var express=require('express'),
    http = require('http'),
    path = require('path'),
    cp = require('child_process');
	exec = require('child_process').exec;
	spawn_sync = require('child_process').spawnSync;


var app = express();

var worker = cp.fork(__dirname + '/child.js');
worker.send({message: 'start'});
//worker.on('log', function(log){
//	console.log(log);
//});

// All your express server code goes here.
// ...
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
  console.log("New visiter");
  res.sendFile(__dirname + "/public/home.html");
});

app.get("/control", function(req, res) {
  console.log("New control visiter");
  worker.kill();
  res.send("");
});

app.post("/restart", function(req, res) {
  console.log("goodbye control visiter");
  worker = cp.fork(__dirname + '/child.js');
  worker.send({message: 'start'});
  res.send("");
});

app.get("/light1", function(req, res) {
	console.log('light1:',req.query.data);
	if (req.query.data == "1") {
		var result = spawn_sync('sh', ['./script/light1-on'], {'uid':1000,'gid':1000});
		console.log(result.stdout.toString());
		console.log(result.stderr.toString());
		if(result.status){
			console.log('Publish failure.');
		}	
	}
	else {
		var result = spawn_sync('sh', ['./script/light1-off'], {'uid':1000,'gid':1000});
		console.log(result.stdout.toString());
		console.log(result.stderr.toString());
		if(result.status){
			console.log('Publish failure.');
		}
	}
	
	res.send("");

});

app.get("/light2", function(req, res) {
	console.log('light2:',req.query.data);
	if (req.query.data == "1")
		exec('./script/light2-on', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	else
		exec('./script/light2-off', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
		
	res.send("");
});

app.get("/light3", function(req, res) {
	console.log('light3:',req.query.data);
	if (req.query.data == "1")
		exec('./script/light3-on', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	else
		exec('./script/light3-off', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
		
	res.send("");
});

app.get("/fan", function(req, res) {
	console.log('fan:',req.query.data);
	if (req.query.data == "1")
		exec('./script/fan-on', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	else
		exec('./script/fan-off', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
		
	res.send("");
});

app.get("/TV", function(req, res) {
	console.log('TV:',req.query.data);
	if (req.query.data == "1")
		exec('./script/TV-on', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	else
		exec('./script/TV-off', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
		
	res.send("");
});

app.get("/curtain", function(req, res) {
	console.log('curtain:',req.query.data);
	if (req.query.data == "1")
		exec('./script/curtain-on', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	else
		exec('./script/curtain-off', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	res.send("");
});

app.get("/door", function(req, res) {
	console.log('door:',req.query.data);
	if (req.query.data == "1")
		exec('./script/door-on', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	else
		exec('./script/door-off', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	res.send("");
});

app.get("/light", function(req, res) {
	console.log('light:',req.query.data);
	if (req.query.data == "1")
		exec('./script/light-on', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	else
		exec('./script/light-off', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	res.send("");
});

module.exports = app;

