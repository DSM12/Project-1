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
var queryURL = "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&callback=initMap";
var userInput = $("#start-point").val().trim();
var dInput = $("#dest-point").val().trim();
//ajax call to our queryURL
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
});

// function buildQueryURL() {
// // queryURL is the url we'll use to query the API
// // Begin building an object to contain our API call's query parameters
// // Set the API key
// // var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };
// // Grab text the user typed into the search input, add to the queryParams object
// queryURL = $("#search-term")
//   .val()
//   .trim();
//   }
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 39.9526, lng: -75.1652 }  // Philly
    });

    var directionsService = new google.maps.DirectionsService;
    var directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
    });

    directionsRenderer.addListener('directions_changed', function () {
        computeTotalDistance(directionsRenderer.getDirections());
    });

    displayRoute('', '', directionsService,
        directionsRenderer);
}

function displayRoute(origin, destination, service, display) {

    service.route({
        origin: origin,
        destination: destination,
        waypoints: [{ location: '' }, { location: '' }],
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

