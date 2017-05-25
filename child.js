var fs = require('fs'),
    exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    spawn_sync = require('child_process').spawnSync;
	
var index = 0;
var created = 0;
var response;

function copyFile(src, dist) {
  fs.writeFileSync(dist, fs.readFileSync(src));
}

function LightTopology(index) {
    console.log("light topology now!");

    var result = spawn_sync('sh', ['./script/pub-'+ index%7], {'uid':1000,'gid':1000});
    console.log(result.stdout.toString());
    console.log(result.stderr.toString());
    if(result.status){
        console.log('Publish failure.');
    }
}

function call(index) {        
    setTimeout(function() {
        LightTopology(index);
    }, 2001);
}


function CreateImage(index) {
    console.log("create image now!");
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
           if (stats.size > 18000) {
	      console.log("the image index is " + index%7);
              copyFile('./public/images/tree_' + index%7 + '.png','./public/images/graph.jpg');
          }
       
       })

    
}


process.on('message', function(m) {
  console.log('CHILD got message:', m);
  
  if (m.message === 'start') {
	  run();
  }
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
        call(index);
	index++;
	setTimeout(run, 3000);
    });
 
    
}
