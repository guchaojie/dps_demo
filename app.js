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
		var result = spawn_sync('./script/publisher', ['-h', '192.168.1.109', '-p', '40000', 'light1_12', '-m', 'lighton'], {'uid':1000,'gid':1000});
		console.log(result.stdout.toString());
		console.log(result.stderr.toString());
		if(result.status){
			console.log('Publish failure.');
		}	
	}
	else {
		var result = spawn_sync('./script/publisher', ['-h', '192.168.1.109', '-p', '40000', 'light1_12', '-m', 'lightoff'], {'uid':1000,'gid':1000});
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
		exec('./script/publisher -h 192.168.1.109 -p 40000 light2_61 -m lighton', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	else
		exec('./script/publisher -h 192.168.1.109 -p 40000 light2_61 -m lightoff', 
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
		exec('./script/publisher -h 192.168.1.100 -p 40001 light3_12 -m lighton', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	else
		exec('./script/publisher -h 192.168.1.100 -p 40001 light3_12 -m lightoff', 
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
		exec('./script/publisher -h 192.168.1.101 -p 40002 fan_61 -m lighton', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	else
		exec('./script/publisher -h 192.168.1.101 -p 40002 fan_61 -m lightoff', 
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
		exec('./script/publisher -h 192.168.1.101 -p 40002 TV_12 -m lighton', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	else
		exec('./script/publisher -h 192.168.1.101 -p 40002 TV_12 -m lightoff', 
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
		exec('./script/publisher -h 192.168.1.112 -p 40003 curtain_12 -m lighton', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	else
		exec('./script/publisher -h 192.168.1.112 -p 40003 curtain_12 -m lightoff', 
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
		exec('./script/publisher -h 192.168.1.112 -p 40003 door_61 -m lighton', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	else
		exec('./script/publisher -h 192.168.1.112 -p 40003 door_61 -m lightoff', 
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
		exec('./script/publisher -h 192.168.1.100 -p 40001 light_61 -m lighton', 
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
	else
		exec('./script/publisher -h 192.168.1.100 -p 40001 light_61 -m lightoff', 
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

