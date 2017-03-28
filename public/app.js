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
          // alert("Load using Ajax");
          $('#selectedItemPanel').style.visibility='visible';
          $('#itemTitle').innerHTML = this.name;
          $('#itemDesc').innterHTML = this.description;
          $('#itemID').innerHTML = this.id;
          $('#largeImg').src = "/images/" + this.id;
          unselectAll();
        }
      });

    } else {
      console.log('Error: ' + xhr.status); // An error occurred during the request.
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

// $('#the_button').on('click', function() {
//   alert("Hi!");
// });
//
// $('#show_modal').on('click', function(){
//
//   $('#my_modal').modal();
//
// });
//
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
  var formData = JSON.stringify( $('form').serializeArray() );
  // var formData = $('form').serializeArray();
  console.log(formData);
  projects.create(formData); //????
  // If projects contains the given id
  //    update that project id with new form information
  //    display item updated message.
  // else
  //    create new project with new form information
  //    sdisplay item uploaded message.
  // if err, display err message.
  // xhr.create(projectToUpload, res, this);
  displayMessage("Item Uploaded.", "success");
});


// $( document ).ready(function(){
//   $('#submitItem').on('click', function(){
//     displayMessage("This is a problem!", "danger");
//   })
//
//   if($('#message_flash').length){
//     var message = $('#message_flash').val();
//     var type = $('#message_type_flash').val();
//     displayMessage(message, type);
//   }
// });
