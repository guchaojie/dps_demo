var express=require('express'),
    http = require('http'),
    fs = require('fs'),
    path = require('path');
    exec = require('child_process').exec;
    spawn = require('child_process').spawn;
    spawn_sync = require('child_process').spawnSync;
    HashTable = require('hashtable');

var index = 0;
var imagetable = new HashTable();
imagetable.put(index, 'graph.png');

function LightTopology(index) {
    var result = spawn_sync('sh', ['./script/pub-'+ index%7], {'uid':1000,'gid':1000});
    console.log(result.stdout.toString());
    console.log(result.stderr.toString());
    if(result.status){
        console.log('Publish failure.');
    }
}

function CreateImage(index) {
    console.log("create image now!");
    setTimeout(function(){
    exec('./script/dps_graph.pl | dot -Tpng -o ./public/images/graph.png',
           {'uid':1000,'gid':1000},
           function (error, stdout, stderr) {
              console.log('stdout: ' + stdout);
	      console.log('stderr: ' + stderr);
	      if (error !== null) {
	          console.log('exec error: ' + error);
                  return;
	      }
       });

       fs.stat('./public/images/graph.png', function (err, stats) {
           if (err) {
	       console.log("read file information failed");
	   }
       
           console.log('file size is ', stats.size);
       
       })

    }, 1000);
    
}

var app = express();

// All your express server code goes here.
// ...
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
  console.log("New visiter");
  res.sendFile(__dirname + "/public/home.html");
});


function run() {
    sh  = spawn('sh', ['./script/tree-'+ index%7], {'uid':1000,'gid':1000});

    sh.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    sh.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    sh.on('exit', function (code) {
        console.log('/script/tree-'+ index%7 + ' exited with code ' + code);
	CreateImage(index);
	LightTopology(index);
	index++;
        setTimeout(run, 1000);
    });
 
    
}

setTimeout(run, 1000);

module.exports = app;
