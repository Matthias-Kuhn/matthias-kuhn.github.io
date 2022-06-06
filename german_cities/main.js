function printMousePos(event) {
    document.body.textContent =
      "clientX: " + event.clientX +
      " - clientY: " + event.clientY;
}

function imageClick(event) {
    let element = document.getElementById('click-box');
    var x = event.clientX - element.offsetLeft;
    var y = event.clientY - element.offsetTop;
    //alert(x+', '+y)
    let marker = document.getElementById('marker-1');
    marker.style.top = y-5 + "px";
    marker.style.left = x-5 + "px";
}

//document.addEventListener("click", printMousePos);

document.querySelector('#click-box').addEventListener('click', imageClick)