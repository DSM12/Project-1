//App planning

//Trip planner with start and end points
//input form
//starting point
//end point
//time of travel
//date of travel
//mode of transportation
//accessibility 

//Delays/Detours
//roads closed
//lines delayed
//(un)availability of routes  

//map
//allow current location
//show closest stops/stations for transit

//route options
//show different modes of trans to reach destination
//show how long each trip would take
//how much each trip will cost

//declaring our global variables
var apiKey = "AIzaSyCm4oR4IdvxBO6YgE4DSiSrVcvAtQ5uXdg";
var queryURL = "https://cors-anywhere.herokuapp.com/" + "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&callback=initMap";
var userInput = 'Philadelphia';
var dInput = 'Pittsburgh';
//ajax call to our queryURL
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
});
$("#form-submit").on("click", function() {
    event.preventDefault();
    userInput = $("#start-point").val().trim();
    dInput = $("#dest-point").val().trim();

    initMap();
});
var directionsRenderer;
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 39.9526, lng: -75.1652 }  // Philly
    });

    var directionsService = new google.maps.DirectionsService;
    if (!directionsRenderer) {
        directionsRenderer = new google.maps.DirectionsRenderer({
            draggable: true,
            map: map,
            panel: document.getElementById('right-panel')
        });
    } else {
        directionsRenderer.map = map;
    }
    

    directionsRenderer.addListener('directions_changed', function () {
        computeTotalDistance(directionsRenderer.getDirections());
    });
    console.log(userInput);
    console.log(dInput);
    displayRoute(userInput, dInput, directionsService,
        directionsRenderer);
}

function displayRoute(origin, destination, service, display) {

    service.route({
        origin: origin,
        destination: destination,
        waypoints: [{ location: origin }, { location: destination }],
        travelMode: 'DRIVING',
        avoidTolls: true
    }, function (response, status) {
        if (status === 'OK') {
            display.setDirections(response);
        } else {
            // alert('Could not display directions due to: ' + status);
        }
    });
}

function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
}

