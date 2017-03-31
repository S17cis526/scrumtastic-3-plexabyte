// module.exports = {
//     list
// }
// funtion list(projects) {
//   var table = $('<table>').class('table');
//   var head = $('<head>').class('head');
// }


"use strict";

/** @module project
 * A RESTful resource representing a software project
 * implementing the CRUD methods.
 */
module.exports = {
  list: list,
  create: create,
  read: read,
  update: update,
  destroy: destroy
}

var multipart = require('../../lib/multipart');
var fs = require('fs');

/** @function list
 * Sends a list of all projects as a JSON array.
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
function list(req, res, db) {
  db.all("SELECT * FROM projects", [], function(err, projects){
    if(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server Error")
    }
    res.setHeader("Content-Type", "text/json");
    res.end(JSON.stringify(projects));
  });
}

/** @function create
 * Creates a new project and adds it to the database.
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
function create(req, res, db) {
  // var body = "";
  //
  // req.on("error", function(err){
  //   console.error(err);
  //   res.statusCode = 500;
  //   res.end("Server error");
  // });
  //
  // req.on("data", function(data){
  //   body += data;
  // });

  multipart(req, res, function(req, res) {
    var project = req.body;
    db.run("INSERT INTO projects (name, artist, genre, filename) VALUES (?,?,?,?)",
      [project.name, project.artists, project.genre, project.filename],
      function(err) {
        if(err) {
          console.error(err);
          res.statusCode = 500;
          res.end("Could not insert album into database");
          return;
        }
        //TODO: FIX THIS
        // if(!req.body.image.filename) {
        //   console.error("No file in upload");
        //   res.statusCode = 400;
        //   res.statusMessage = "No file specified"
        //   res.end("No file specified");
        //   return;
        // }
        console.log('images/' + req.body.id);
        // fs.writeFile('images/' + req.body.id, req.body.file.data, function(err){
        //   if(err) {
        //     console.error(err);
        //     res.statusCode = 500;
        //     res.statusMessage = "Server Error";
        //     res.end("Server Error");
        //     return;
        //   }
        //   res.statusCode = 200;
        //   res.end();
        // });
      }
    );
  });
}

/** @function read
 * Serves a specific project as a JSON string
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
function read(req, res, db) {
  var id = req.params.id;
  db.get("SELECT * FROM projects WHERE id=?", [id], function(err, project){
    if(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server error");
      return;
    }
    if(!project) {
      res.statusCode = 404;
      res.end("Project not found");
      return;
    }
    res.setHeader("Content-Type", "text/json");
    res.end(JSON.stringify(project));
  });
}


/** @update
 * Updates a specific record with the supplied values
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
function update(req, res, db) {
  var id = req.params.id;
  var body = "";

  req.on("error", function(err){
    console.error(err);
    res.statusCode = 500;
    res.end("Server error");
  });

  req.on("data", function(data){
    body += data;
  });

  req.on("end", function() {
    var project = JSON.parse(body);
    db.run("UPDATE projects SET name=?, artist=?, genre=?, filename=? WHERE id=?",
      [project.name, project.artist, project.genre, project.filename, id],
      function(err) {
        if(err) {
          console.error(err);
          res.statusCode = 500;
          res.end("Could not update project in database");
          return;
        }
        res.statusCode = 200;
        res.end();
      }
    );
  });
}

/** @destroy
 * Removes the specified project from the database.
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
function destroy(req, res, db) {
  var id = req.params.id;
  db.run("DELETE FROM projects WHERE id=?", [id], function(err) {
    if(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server error");
    }
    res.statusCode = 200;
    res.end();
  });
}
