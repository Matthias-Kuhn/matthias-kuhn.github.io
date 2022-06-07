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
    marker.style.visibility = "visible"
    marker.style.top = y-5 + "px";
    marker.style.left = x-5 + "px";

    setResultMarker(52520008,13404954);
}

document.querySelector('#click-box').addEventListener('click', imageClick)

function nextCity() {
    var name = "Münster";
    var latitude = 51961563;
    var longitude = 7628202;
}

function setResultMarker(longitude, latitude) {
    let marker = document.getElementById('marker-2');
    let offset = 2* Math.sqrt(8);

    var x = getXCoordinate(longitude, latitude);
    var y = getYCoordinate(longitude);

    marker.style.top = y-offset + "px";
    marker.style.left = x-offset + "px";
}

function getXCoordinate(longitude, latitude) {
    let f_longitude = parseFloat(longitude) / 1000000;
    let f_latitude = parseFloat(latitude) / 1000000;
    let moved_pos = (f_latitude - 10.0) * Math.cos(f_longitude * Math.PI / 180.0) * 93.37 * getScaleRatio();
    return moved_pos + 257.25 * getScaleRatio();
}

function getYCoordinate(longitude) {
    var f_longitude = parseFloat(longitude) / 1000000;
    console.log((55.477-f_longitude) * 24.7 * getScaleRatio())
    return (55.477-f_longitude) * 93.37 * getScaleRatio();
}

function getScaleRatio() {
    let element = document.getElementById('click-box');
    let width = element.offsetWidth;
    let height = element.offsetHeight;

    if (width < height * 0.6983) {
        // takes width for image
        console.log("used width");
        return width / 567.0;
    } 
    // takes height for image
    return height / 812.0;
}
