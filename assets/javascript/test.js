

// Google map
var map;
var infowindow;
var search;

$("#select-food-type").on("click", function(event) {
  event.preventDefault();
  console.log($("#food-type").val())
  search = $("#food-type").val()
  initMap()
})

function initMap() {
  var denver = {lat: 39.676599, lng: -104.961895};

  map = new google.maps.Map(document.getElementById("map"), {
    center: denver,
    zoom: 15
  });


  var request = {
    location: denver,
    radius: "500",
    keyword: search,
    type: ["restaurant"]
  };

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var iconBase = 'assets/javascript/';
    var marker = new google.maps.Marker({
      position: placeLoc,
      map: map,
      icon: iconBase + 'restaurant.png'
    });

  google.maps.event.addListener(marker, "click", function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
} // End Google Map