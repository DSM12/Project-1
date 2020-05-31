
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
$(document).ready(function() {
    var userInput;
    // console.log(userInput);
    var dInput;

    var intendedArrival;
// console.log(dInput);
    $("#map").hide();
    // $(".container").hide();
    $("#right-panel").hide();
// $(".form-submit").on("click", function () {
    $('#exampleModal').on('show.bs.modal', function (event) {
        console.log("Let's get going!");

        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.  
    });
  
var apiKey = "AIzaSyCm4oR4IdvxBO6YgE4DSiSrVcvAtQ5uXdg";
var queryURL = "https://cors-anywhere.herokuapp.com/" + "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&callback=initMap";
var directionsRenderer;
var directionsService;   

//ajax call to our queryURL
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);

});
        

    })
    // 1) grab values of modals
    // 2) save them 
    // 3) populate what needs to be populated
    // 4) then unhide
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 39.9526, lng: -75.1652 }  // Philly
    });

    directionsService = new google.maps.DirectionsService;
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
        // computeTotalDistance(directionsRenderer.getDirections());
    });
    console.log(userInput);
    console.log(dInput);
    displayRoute(userInput, dInput, directionsService,
        directionsRenderer);
}
function displayRoute(origin, destination, service, display) {

  
    
    service.route({
        origin: $("#origin").val().trim(),
        destination: $("#destination").val().trim(),

        // waypoints: [{ location: origin }, { location: destination }],
        travelMode: 'TRANSIT',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidTolls: true,

    }, function (response, status) {
        if (status === 'OK') {
            display.setDirections(response);
            //    
            var results = response; 
        
            
           console.log(results);
           var durationResults = response.routes;
           var durationResults2 = durationResults[0];
           var durationResults3 = durationResults2.legs;
           var durationResults4 = durationResults3[0];
           var durationResults5 = durationResults4.arrival_time;
           
    // Below will get you estimated arrival time
           var durationResults6 = durationResults5.text;
     console.log(durationResults6);
     if (intendedArrival < durationResults6) {
        alert("you're going to be LATE")   
        }
        
        } else {
            // alert('Could not display directions due to: ' + status);
        }
       
    });        
    
}
//ajax call to our queryURL
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
});
$("#submit-route").on("click", function () {
    event.preventDefault();
    // userInput = $("#start-point").val().trim();
    // dInput = $("#dest-point").val().trim();
    var modal = $("#exampleModal");
        userInput = modal.find('#origin').val().trim();
        console.log(userInput);
        dInput = modal.find('#destination').val().trim();
        console.log(dInput);
        initMap();
        $("#exampleModal").hide();
        $("#map").show();
        // $(".container").show();
        $("#right-panel").show();
        $('.modal-backdrop').remove();
    // displayRoute();
    // computeTotalDistance();
});


$("#submit-route").on("click", function () {

    event.preventDefault();
    
    var modal = $("#exampleModal");
        userInput = modal.find('#origin').val().trim();
        console.log(userInput);
        dInput = modal.find('#destination').val().trim();
        console.log(dInput);
        intendedArrival = modal.find("#default-picker").val();
        console.log(intendedArrival);

   

        initMap();
   
        $("#exampleModal").hide();
        $("#map").show();
        // $(".container").show();
        $("#right-panel").show();
        $("#route-button").remove();
        $('.modal-backdrop').remove();
        

});

// function computeTotalDistance(result) {
//     var total = 0;
//     var myroute = result.routes[0];
//     for (var i = 0; i < myroute.legs.length; i++) {
//         total += myroute.legs[i].distance.value;
//     }
//     total = total / 1000;
//     document.getElementById('total').innerHTML = total + ' km';
// }


});

// var originList = results.route[0];
// var destinationList = results.route[1];

// console.log(originList);
// console.log(destinationList);


