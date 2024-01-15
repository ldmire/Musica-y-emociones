if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(muestraPosicion, errorPosicion);
}

function muestraPosicion(pos){
  alert('Te encuentras en las siguientes coordenadas: (' + position.coords.latitude + ', ' + position.coords.longitude + ')' );
}

function errorPosicion(err) {
    switch(err.code) {
        case err.PERMISSION_DENIED:
            alert("Debe usted permitir el acceso a su posición para que la aplicación pueda funcionar");
            break;
        case err.POSITION_UNAVAILABLE:
            alert("La información sobre su posición actual no está disponible");
            break;
        case err.TIMEOUT:
            alert("No he podido obtener su posición en un tiempo razonable");
            break;
        default:
            alert("Se ha producido un error desconocido al intentar obtener la posición actual");
            break;
    }
}


function addComment() {

  var username = document.getElementById("username").value;
  var commentText = document.getElementById("comment").value;


  if (username && commentText) {
    if (containsForbiddenWords(commentText)) {
      alert("El comentario contiene palabras prohibidas. Por favor, sé respetuoso.");
      return;
    }

    var commentContainer = document.getElementById("comment-container");
    var newComment = document.createElement("div");
    newComment.classList.add("comment");

    newComment.innerHTML = "<p><strong>" + username + ":</strong> " + commentText + "</p>";
    commentContainer.appendChild(newComment);
    saveComment(username, commentText);

    document.getElementById("username").value = "";
    document.getElementById("comment").value = "";
  } else {
    alert("Por favor, proporciona tu nombre y comentario");
  }
}


function containsForbiddenWords(commentText) {
  var forbiddenWords = ["puto", "puta", "mierda", "gilipollas"];
  var lowercaseComment = commentText.toLowerCase();
  for (var i = 0; i < forbiddenWords.length; i++) {
    if (lowercaseComment.includes(forbiddenWords[i])) {
      return true; 
    }
  }
  return false; 
}


function saveComment(username, commentText) {
  var comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push({ username: username, commentText: commentText });
  localStorage.setItem("comments", JSON.stringify(comments));
}


window.onload = function () {
  var comments = JSON.parse(localStorage.getItem("comments")) || [];


  var commentContainer = document.getElementById("comment-container");
  comments.forEach(function (comment) {
    var newComment = document.createElement("div");
    newComment.classList.add("comment");
    newComment.innerHTML = "<p><strong>" + comment.username + ":</strong> " + comment.commentText + "</p>";
    commentContainer.appendChild(newComment);
  });
};