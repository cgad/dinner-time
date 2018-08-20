var map;
var infowindow;
var search;

$("#select-food-type").on("click", function (event) {
  event.preventDefault();
  console.log($('#food-type').val())
  search = $('#food-type').val()
  initMap()
})

function initMap() {
  var pyrmont = { lat: 39.676599, lng: -104.961895 };

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });

  var request = {
    location: pyrmont,
    radius: '500',
    keyword: search,
    type: ['restaurant']
  };

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  console.log(results)
  
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
        console.log(results[i].name)
        var googleResults = $("<div class=gifs>");
        var names = $("<p id='name-text'>");
        names.text("Name: " + results[i].name); // pulled from array as results[i].name
        var hours = $("<p id='hours-text'>");
        hours.text("Hours: " + results[i].opening_hours.open_now); // nested to get value from the opening hours value of open now
        var location = $("<p id='location-text'>");
        location.text("Location: " + results[i].vicinity)
        var price = $("<p id='price-text'>");
        price.text("Price: " + results[i].price_level);
        var rating = $("<p id='rating-text'>");
        rating.text("Rating: " + results[i].rating)
        googleResults.append(names);
        googleResults.append(hours);
        googleResults.append(location);
        googleResults.append(price);
        googleResults.append(rating);
        $("#return-info").prepend(googleResults);
      usePlaceId(results[i]);
    }
  }
}

function usePlaceId(place) {


  var request2 = {
    placeId: place.place_id,
    fields: ['name', 'rating', 'formatted_phone_number', 'opening_hours.weekday_text', 'geometry', 'address_component', 'contact', 'adr_address', 'alt_id', 'formatted_address', 'icon', 'id', 'permanently_closed', 'photo', 'place_id', 'plus_code', 'scope', 'type', 'url', 'utc_offset', 'vicinity', 'opening_hours', 'website', 'price_level', 'rating', 'review']
  };

  var service2 = new google.maps.places.PlacesService(map);
  service2.getDetails(request2, callback);

  function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMarker(place);
    }
  }
}


function createMarker(place) {

  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'mouseover', function () {
    $('#hoverTry').text(JSON.stringify(place))
  });
  google.maps.event.addListener(marker, 'mouseout', function () {
    $('#hoverTry').text('')
  });
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

