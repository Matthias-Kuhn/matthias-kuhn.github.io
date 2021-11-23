const FlowEnum = Object.freeze({
  "START": 6,
  "INPUT_A": 1,
  "REARRANGE_A": 2,
  "INPUT_B": 3,
  "REARRANGE_B": 4,
  "RESULT": 5
})
var moviesOfA = ["", "", "", "", ""];
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
      document.getElementById("input_header").innerHTML="Person B:";
      document.getElementById("replace_box").innerHTML = document.getElementById('input_box').innerHTML;
      break;
    case FlowEnum.REARRANGE_B:
      document.getElementById("replace_box").innerHTML = document.getElementById('rearrange').innerHTML;
      break;
    case FlowEnum.RESULT:
      document.getElementById("replace_box").innerHTML = document.getElementById('result').innerHTML;
      document.getElementById("button_box").innerHTML = "";
      break;
  }
}
