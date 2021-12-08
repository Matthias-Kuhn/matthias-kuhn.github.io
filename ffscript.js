const FlowEnum = Object.freeze({
  "START": 6,
  "INPUT_A": 1,
  "REARRANGE_A": 2,
  "INPUT_B": 3,
  "REARRANGE_B": 4,
  "REARRANGE_AFORB": 7,
  "REARRANGE_BFORA": 8,
  "RESULT": 5
});

var WEIGHT_OWN = 1.0;
var WEIGHT_OTHER = 1.5;

var moviesOfA = new Array(5);
var moviesOfB = new Array(5);
var movies = new Array(10);

// initial element
var currentStep = FlowEnum.START;

function BtnClick() {

  // get movies from input fields
  //var films = document.getElementsByTagName("input");
  //for (var i = 0; i < 5; i++) {
  //  moviesOfA[i] = films[i].value;
  //}
  //alert(moviesOfA[0]);

  switch (currentStep) {
    case FlowEnum.INPUT_A:
      // get movies from input fields
      var films = document.getElementsByTagName("input");
      for (var i = 0; i < 5; i++) {
        moviesOfA[i] = new Movie(films[i].value);
      }
      break;
    case FlowEnum.REARRANGE_A:
      // test ranking
      moviesOfA[0].rankOfOwner = 4;
      moviesOfA[1].rankOfOwner = 3;
      moviesOfA[2].rankOfOwner = 2;
      moviesOfA[3].rankOfOwner = 1;
      moviesOfA[4].rankOfOwner = 0;

      break;
    case FlowEnum.INPUT_B:
      // get movies from input fields
      var films = document.getElementsByTagName("input");
      for (var i = 0; i < 5; i++) {
        moviesOfB[i] = new Movie(films[i].value);
      }
      break;
    case FlowEnum.REARRANGE_B:
      // test ranking
      moviesOfB[0].rankOfOwner = 4;
      moviesOfB[1].rankOfOwner = 3;
      moviesOfB[2].rankOfOwner = 2;
      moviesOfB[3].rankOfOwner = 1;
      moviesOfB[4].rankOfOwner = 0;

      break;
    case FlowEnum.REARRANGE_BFORA:
      // test ranking
      moviesOfA[0].rankOfOther = 4;
      moviesOfA[1].rankOfOther = 3;
      moviesOfA[2].rankOfOther = 2;
      moviesOfA[3].rankOfOther = 1;
      moviesOfA[4].rankOfOther = 0;

      break;
    case FlowEnum.REARRANGE_AFORB:
      // test ranking
      moviesOfB[0].rankOfOther = 4;
      moviesOfB[1].rankOfOther = 3;
      moviesOfB[2].rankOfOther = 2;
      moviesOfB[3].rankOfOther = 1;
      moviesOfB[4].rankOfOther = 0;

      calculateMovie();

      break;

  }
  nextStep();
  updateLayout();

}


// This method allows easy inserting of new steps
function nextStep() {
  switch (currentStep) {
    case FlowEnum.START:
      currentStep = FlowEnum.INPUT_A;
      break;
    case FlowEnum.INPUT_A:
      currentStep = FlowEnum.REARRANGE_A;
      break;
    case FlowEnum.REARRANGE_A:
      currentStep = FlowEnum.INPUT_B;
      break;
    case FlowEnum.INPUT_B:
      currentStep = FlowEnum.REARRANGE_B;
      break;
    case FlowEnum.REARRANGE_B:
      currentStep = FlowEnum.REARRANGE_BFORA;
      break;
    case FlowEnum.REARRANGE_BFORA:
      currentStep = FlowEnum.REARRANGE_AFORB;
      break;
    case FlowEnum.REARRANGE_AFORB:
      currentStep = FlowEnum.RESULT;
      break;
  }

}

function updateLayout() {
  switch (currentStep) {
    case FlowEnum.INPUT_A:
      document.getElementById("replace_box").innerHTML = document.getElementById('input_box').innerHTML;
      document.getElementById("btn_weiter").innerHTML = "Weiter";
      break;
    case FlowEnum.REARRANGE_A:
      fillRearrangeList();
      document.getElementById("replace_box").innerHTML = document.getElementById('rearrange').innerHTML;
      enableDragAndDrop();
      break;
    case FlowEnum.INPUT_B:

      var films = document.getElementsByTagName("input");
      for (var i = 0; i < 5; i++) {
        films[i].value = "";
      }
      document.getElementById("input_header").innerHTML = "Person B:";
      document.getElementById("replace_box").innerHTML = document.getElementById('input_box').innerHTML;
      break;
    case FlowEnum.REARRANGE_B:

      document.getElementById("replace_box").innerHTML = document.getElementById('rearrange').innerHTML;
      document.getElementById("rearrange_header").innerHTML = "Person B:"
      fillRearrangeList();
      enableDragAndDrop();
      break;
    case FlowEnum.REARRANGE_BFORA:
      document.getElementById("replace_box").innerHTML = document.getElementById('rearrange').innerHTML;
      document.getElementById("rearrange_header").innerHTML = "Person B:"
      fillRearrangeList();
      enableDragAndDrop();
      break;
    case FlowEnum.REARRANGE_AFORB:


      document.getElementById("replace_box").innerHTML = document.getElementById('rearrange').innerHTML;
      fillRearrangeList();
      document.getElementById("rearrange_header").innerHTML = "Person A:"
      enableDragAndDrop();
      break;
    case FlowEnum.RESULT:
      document.getElementById('result').appendChild(createResultUl());
      document.getElementById("replace_box").innerHTML = document.getElementById('result').innerHTML;
      document.getElementById("button_box").innerHTML = "";
      document.getElementById("result_txt").innerHTML = movies[0].name;
      break;
  }


}


function calculateMovie() {
  for (var i = 0; i < 5; i++) {
    moviesOfA[i].calculateRank();
    moviesOfB[i].calculateRank();
    movies.push(moviesOfA[i]);
    movies.push(moviesOfB[i]);
  }
  movies.sort(compareMovies);
}

class Movie {
  constructor(name) {
    this.name = name;
    this.rankOfOwner = 0;
    this.rankOfOther = 0;
    this.points = 0;
  }
  calculateRank() {
    this.points = this.rankOfOwner * WEIGHT_OWN + this.rankOfOther * WEIGHT_OTHER;
  }
}

function compareMovies(a, b) {
  if (a.points < b.points) {
    return 1;
  }
  if (a.points > b.points) {
    return -1;
  }
  return 0;
}

function createResultUl() {
  var list = document.createElement('ul');

  for (var i = 0; i < 10; i++) {
    var item = document.createElement('li');
    item.appendChild(document.createTextNode(movies[i].name + "    (" + movies[i].points + " Punkte)"));
    list.appendChild(item);
  }
  return list;
}

function fillRearrangeList() {
  var movieList;
  switch (currentStep) {
    case FlowEnum.REARRANGE_A:
      movieList = moviesOfA;
      break;
    case FlowEnum.REARRANGE_B:
      movieList = moviesOfB;
      break;
    case FlowEnum.REARRANGE_BFORA:
      movieList = moviesOfA;
      break;
    case FlowEnum.REARRANGE_AFORB:
      movieList = moviesOfB;
      break;
  }
  var items = document.getElementsByClassName("drag_item_inner");
  for (var i = 0; i < 5; i++) {
    items[i].innerHTML = movieList[i].name;
  }
}
