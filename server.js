// "use strict";
//
// var PORT = 3000;
//
// var http = require('http');
// var fileserver = require('./lib/fileserver');
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('scrumtastic.sqlite3', function(err) {
//   if(err) console.error(err);
// });
// var router = new (require('./lib/route')).Router(db);
//
// // Cache static directory in the fileserver
// fileserver.loadDir('public');
//
// // Define our routes
// var project = require('./src/resource/project');
// router.resource('/projects', project);
//
// var server = new http.Server(function(req, res) {
//   // Remove the leading '/' from the resource url
//   var resource = req.url.slice(1);
//   // If no resource is requested, serve the cached index page.
//   if(resource == '')
//     fileserver.serveFile('public/index.html', req, res);
//   // If the resource is cached in the fileserver, serve it
//   else if(fileserver.isCached(resource))
//     fileserver.serveFile(resource, req, res);
//   // Otherwise, route the request
//   else router.route(req, res);
// });
//
// // Launch the server
// server.listen(PORT, function(){
//   console.log("listening on port " + PORT);
// });

"use strict";

var PORT = 3000;

var fs = require('fs');
var http = require('http');
// var fileserver = require('./lib/fileserver');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('scrumtastic.sqlite3', function(err) {
  if(err) console.error(err);
});

// fileserver.loadDir('images');

var router = new (require('./lib/route')).Router(db);
router.get('/', function(req, res) {
  fs.readFile('public/index.html', function(err, body){
    res.end(body);
  });
});

router.get('/app.js', function(req, res) {
  fs.readFile('public/app.js', function(err, body){
    res.end(body);
  });
});

router.get('/style.css', function(req, res) {
  fs.readFile('public/style.css', function(err, body) {
    res.end(body);
  });
});

// var items = fs.readdirSync('images');
// items.forEach(function(item) {
//   console.log(item);
//   router.get('/images/' + item, function(req, res) {
//     fs.readFile('images/' + item, function(err, body) {
//       res.end(body);
//     });
//   });
// });



var project = require('./src/resource/project');
router.resource('/projects', project);

var migrate = require('./lib/migrate');
migrate(db, 'migrations', function(err){

  var server = new http.Server(function(req, res) {
    router.route(req, res);
  });
  server.listen(PORT, function(){
    console.log("listening on port " + PORT);
  });


});

function serveImage(fileName, req, res) {
  fs.readFile('images/' + decodeURIComponent(fileName), function(err, data){
    if(err) {
      console.error(err);
      res.statusCode = 404;
      res.statusMessage = "Resource not found";
      res.end();
      return;
    }
    res.setHeader('Content-Type', 'image/*');
    res.end(data);
  });
}

// var files = {};
// var items = fs.readdirSync('images');
// items.forEach(function(item) {
//   var path = 'images/' + item;
//
//   var stats = fs.statSync(path);
//   if(stats.isFile()) {
//     var parts = path.split('.');
//     var extension = parts[parts.length-1];
//     var type = 'application/octet-stream';
//     switch(extension) {
//       case 'jpeg':
//       case 'jpg':
//         type = 'image/jpeg';
//         break;
//       case 'gif':
//       case 'png':
//       case 'bmp':
//       case 'tiff':
//       case 'svg':
//         type = 'image/' + extension;
//         break;
//     }
//     files[path] = {
//       contentType: type,
//       data: fs.readFileSync(path)
//     };
//   }
// });
