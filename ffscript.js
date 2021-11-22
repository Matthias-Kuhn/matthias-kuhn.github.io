var moviesOfA = ["","","","",""];

function BtnClick() {
  // get movies from input fields
  var films = document.getElementsByTagName("input");
  for (var i = 0; i < 5; i++) {
    moviesOfA[i] = films[i].value;
  }
  alert(moviesOfA[0]);

}
