import {getNextCity} from '/german_cities/cities.js'

const MAX_ROUNDS = 5;

var city_name = "Münster"
var longitude = 51961563;
var latitude = 7628202;

var last_cities = [];

var clickX = 0;
var clickY = 0;

var round = 1;
var km_off = 0;

var search_mode = true;
var result_shown = false;
var guessed = false; 

document.addEventListener('DOMContentLoaded', function() {
    nextCity();
}, false);

function imageClick(event) {
    if (result_shown) return;
    if (!search_mode) return;
    guessed = true;
    let element = document.getElementById('click-box');
    clickX = event.clientX - element.offsetLeft;
    clickY = event.clientY - element.offsetTop;
    
    let marker = document.getElementById('marker-1');
    marker.style.visibility = "visible"
    marker.style.top = clickY-5 + "px";
    marker.style.left = clickX-5 + "px";
    getDistance();
    
}

document.querySelector('#click-box').addEventListener('click', imageClick)
document.querySelector('#btn').addEventListener('click', sendBtnClick)

function sendBtnClick() {
    if (result_shown) document.location.reload();
    if (!search_mode) {
        if (round == 5) {
            showResult();
            return;
        }
        document.getElementById('btn').innerHTML = "ABSCHICKEN"
        search_mode = true;
        guessed = false;
        document.getElementById('marker-1').style.visibility = "hidden";
        document.getElementById('marker-2').style.visibility = "hidden";
        nextCity();
        round ++;
        document.getElementById('round').innerHTML = round + "/5";
        return;
    }

    if (!guessed) return

    search_mode = false;
    setResultMarker(latitude,longitude)

    if (round == 5) {
        document.getElementById('btn').innerHTML = "ERGEBNIS ZEIGEN"
    } else { 
        document.getElementById('btn').innerHTML = "NÄCHSTE STADT"
    }
    km_off += getDistance();
}


function nextCity() {
    let values = getNextCity();
    while (last_cities.includes(values[0])) {
        values = getNextCity();
    }

    city_name = values[0];
    last_cities.push(city_name);
    latitude = parseInt(values[1]);
    longitude = parseInt(values[2]);

    document.getElementById('city-name').innerHTML = city_name;
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

function getDistance() {
    let deltaX = Math.abs(clickX-getXCoordinate(latitude, longitude))
    let deltaY = Math.abs(clickY-getYCoordinate(latitude))
    var distance = Math.sqrt(deltaX*deltaX+deltaY*deltaY);
    return distance * 111.111/(93.37*getScaleRatio());
}


function showResult() {
    result_shown = true;
    if (km_off < 150) fillStar('star5');
    if (km_off < 350) fillStar('star4');
    if (km_off < 550) fillStar('star3');
    if (km_off < 650) fillStar('star2');
    if (km_off < 950) fillStar('star1');

    setResultMessage();

    document.getElementById('btn').innerHTML = "ERNEUT SPIELEN"
    document.getElementById('result-popup').style.visibility = "visible";

}

function fillStar(id) {
    document.getElementById(id).style.backgroundImage = "url(german_cities/star_filled.png)"
}

function setResultMessage() {
    var result_text = "("+parseInt(km_off)+"km) "
    if (km_off < 150) result_text +="Hervorragend!";
    else if (km_off < 350) result_text +="Sehr Gut!";
    else if (km_off < 550) result_text +="Gut";
    else if (km_off < 650) result_text +="Naja";
    else if (km_off < 950) result_text +="Herrje";
    else result_text +="(╯°□°）╯︵ ┻━┻";

    document.getElementById('result-msg').innerHTML = result_text

}