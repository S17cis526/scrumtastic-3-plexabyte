// var xhr = new XMLHttpRequest();
// xhr.open('GET', '/projects/');
// xhr.send(null);

// xhr.onreadystatechange = function() {
//   var DONE = 4; // readyState 4 means the request is done.
//   var OK = 200; // status 200 is a successful return.
//   if (xhr.readyState === DONE) {
//     if (xhr.status === OK) {
//       console.log(xhr.responseText); // 'This is the returned text.'
//       var projects = JSON.parse(xhr.responseText);
//       projects.forEach(function(project){
//         var name = document.createElement('a');
//         name.innerHTML = project.name;
//         name.href = "/projects/" + project.id;
//         document.body.appendChild(name);
//         project.onClick = function(event) {
//           event.preventDefault();
//           alert("Load using Ajax");
//         }
//       });
//
//     } else {
//       console.log('Error: ' + xhr.status); // An error occurred during the request.
//     }
//   }
// }

// function loadIndex() {
//   $.get('/projects', function(projects, status) {
//     if(status == 200) {
//       $('body').clear();
//       projects.forEach(function(project)) {
//         var link = $('a')
//           .text(project.name)
//           .attr('href', '/projects/'+ project.id)
//           .on('click', function(e) {
//             e.preventDefault();
//             loadProject('/projects/' + project.id)
//           });
//         $('body').append(link);
//       }
//     }
//   });
// }


// function loadProject(url) {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', url);
//   xhr.send(null);
//
//   xhr.onreadystatechange = function() {
//     var DONE = 4; // readyState 4 means the request is done.
//     var OK = 200; // status 200 is a successful return.
//     if (xhr.readyState === DONE) {
//       if (xhr.status === OK) {
//         console.log(xhr.responseText); // 'This is the returned text.'
//         var project = JSON.parse(xhr.responseText);
//         var wrapper = document.createElement('div');
//         var name = document.createElement('h1');
//         var image = document.createElement('img');
//         name.innerHTML = project.name;
//         image.src = project.imageSrc;
//         wrapper.body.appendChild(name);
//         wrapper.appendChild(image);
//         document.body.appendChild(wrapper);
//       } else {
//         console.log('Error: ' + xhr.status); // An error occurred during the request.
//       }
//     }
//   }
// }


function loadIndex() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/projects/');
  xhr.send(null);

  xhr.onreadystatechange = function() {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        console.log(xhr.responseText); // 'This is the returned text.'
        var projects = JSON.parse(xhr.responseText);
        projects.forEach(function(project){
          var name = document.createElement('a');
          name.innerHTML = project.name;
          name.href = "/projects/" + project.id;
          document.body.appendChild(name);
          project.onClick = function(event) {
            event.preventDefault();
            alert("Load using Ajax");
            loadProject("/projects/" + project.name);
            $('#selectedItemPanel').style.visibility='visible';
            $('#itemName').innerHTML = this.name;
            $('#itemArtist').innerHTML = this.artist;
            $('#itemGenre').innerHTML = this.genre;
            $('#largeImg').src = "/images/" + this.id;
            // router.get('/images/':filename, function() {
            //   var filename = req.params.filename;
            //   fs.readFile('images/' + filename, function(err, data){
            //     res.end(data);
            //   });
            // });
            unselectAll();
          }
        });

      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
  }
}


// $('#submitItem').on('click', function() {
//   var item = $('form').serializeArray();
//   displayMessage("Item Submitted.", "success")
// });

function unselectAll() {
    if(document.selection) document.selection.empty();
    if(window.getSelection) window.getSelection().removeAllRanges();
}
function hideMe(obj) {
    obj.style.visibility = 'hidden';
}

var displayMessage = function(message, type){
  var html = '<div id="javascriptMessage" class="alert fade show alert-dismissable alert-'
           + type + '"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span class="h4">'
           + message + ' </span></div>';
  $('#message').append(html);
  setTimeout(function() {
  	$("#javascriptMessage").alert('close');
  }, 3000);
};

$('#submitItem').on('click', function() {

  var xhr = new XMLHttpRequest();
  var formData = new FormData($('form')[0]);
  // var formData = new FormData();
  // formData.append('name', $('#name').val());
  // formData.append('artist', $('#artist').val());
  // formData.append('genre', $('#genre').val());
  // formData.append('filename', $('#filename')[0].files[0], $('#filename').val());
  //TODO: add music

  xhr.open('POST', '/projects/');
  xhr.send(formData);
  loadIndex();
  // $.xhr({
  //   type: "POST",
  //   url: '/projects',
  //   data: formData,
  //   contentType: 'multipart/form-data',
  //   processData: false
  // });


  // formData.append('filename', $('input[type=file]')[0].files[0]);

  console.log(formData);



  displayMessage("Item Uploaded.", "success");
});

$('#addItem').on('click', function() {
  var form = $('#editForm');
  if (form.css('visibility') == 'visible') {
    form.css('visibility', 'hidden');
  }
  else {
    form.css('visibility', 'visible');
  }
});

loadIndex();
