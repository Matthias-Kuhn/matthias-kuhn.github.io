const FlowEnum = Object.freeze({
  "START": 6,
  "INPUT_A": 1,
  "REARRANGE_A": 2,
  "INPUT_B": 3,
  "REARRANGE_B": 4,
  "REARRANGE_AFORB": 7,
  "REARRANGE_BFORA": 8,
  "RESULT": 5
})

var WEIGHT_OWN = 1.0;
var WEIGHT_OTHER = 1.5;

var moviesOfA = ["", "", "", "", ""];
var moviesOfB = ["", "", "", "", ""];

var rankingMoviesOfA = [0,0,0,0,0];
var rankingMoviesOfB = [0,0,0,0,0];

var rankingAforA = [0,0,0,0,0];
var rankingAforB = [0,0,0,0,0];

var rankingBforB = [0,0,0,0,0];
var rankingBforA = [0,0,0,0,0];


// initial element
var currentStep = FlowEnum.START;

function BtnClick() {
  // get movies from input fields
  //var films = document.getElementsByTagName("input");
  //for (var i = 0; i < 5; i++) {
  //  moviesOfA[i] = films[i].value;
  //}
  //alert(moviesOfA[0]);
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
      document.getElementById("replace_box").innerHTML = document.getElementById('rearrange').innerHTML;
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
      break;
    case FlowEnum.REARRANGE_BFORA:
      document.getElementById("replace_box").innerHTML = document.getElementById('rearrange').innerHTML;
      break;
    case FlowEnum.REARRANGE_AFORB:
      document.getElementById("replace_box").innerHTML = document.getElementById('rearrange').innerHTML;
      break;
    case FlowEnum.RESULT:
      document.getElementById("replace_box").innerHTML = document.getElementById('result').innerHTML;
      document.getElementById("button_box").innerHTML = "";
      break;
  }


}

function calculateMovie() {
  for (var i = 0; i < 5; i++) {
    rankingMoviesOfA = rankingAforA * WEIGHT_OWN + rankingBforA * WEIGHT_OTHER;
    rankingMoviesOfB = rankingBforB * WEIGHT_OWN + rankingAforB * WEIGHT_OTHER;
    // TODO: Last decider gets disadvantage
  }


}

class Movie {
  constructor(name) {
    this.name = name;
    this.rankOfOwner = 0;
    this.rankOfOther = 0;
    this.points = 0;
  }
}
