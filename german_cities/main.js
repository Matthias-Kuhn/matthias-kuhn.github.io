import {getNextCity} from '/german_cities/cities.js'

const MAX_ROUNDS = 5;

var city_name = "Münster"
var longitude = 51961563;
var latitude = 7628202;

var round = 0;
var km_off = 0;


document.addEventListener('DOMContentLoaded', function() {
    nextCity();
}, false);

function imageClick(event) {
    
    let element = document.getElementById('click-box');
    var x = event.clientX - element.offsetLeft;
    var y = event.clientY - element.offsetTop;
    //alert(x+', '+y)
    let marker = document.getElementById('marker-1');
    marker.style.visibility = "visible"
    marker.style.top = y-5 + "px";
    marker.style.left = x-5 + "px";

    setResultMarker(latitude,longitude)
}

document.querySelector('#click-box').addEventListener('click', imageClick)

function nextCity() {
    let values = getNextCity();
    city_name = values[0];
    latitude = parseInt(values[1]);
    longitude = parseInt(values[2]);

    document.getElementById('city-name').innerHTML = city_name;
    console.log(longitude)
    console.log(latitude)
    setResultMarker(latitude,longitude)
}

function setResultMarker(latitude, longitude) {
    let marker = document.getElementById('marker-2');

    let offset = 2* Math.sqrt(8);

    var x = getXCoordinate(latitude, longitude);
    var y = getYCoordinate(latitude);

    marker.style.visibility='visible';
    marker.style.top = y-offset + "px";
    marker.style.left = x-offset + "px";
}

function getXCoordinate(latitude, longitude) {
    let f_longitude = parseFloat(longitude) / 1000000;
    let f_latitude = parseFloat(latitude) / 1000000;
    let moved_pos = (f_longitude - 10.0) * Math.cos(f_latitude * Math.PI / 180.0) * 93.37 * getScaleRatio();
    return moved_pos + 257.25 * getScaleRatio();
}

function getYCoordinate(latitude) {
    var f_latitude = parseFloat(latitude) / 1000000;
    return (55.477-f_latitude) * 93.37 * getScaleRatio();
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
