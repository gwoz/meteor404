meteorArray = []

var map1;
function initMap() {
  map1 = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7128, lng: -74.0059},
    zoom: 6
  });

  var Meteor = function(lat, lng, name){
    this.lat = lat;
    this.lng = lng;
    this.name = name;
  }

  var populateMeteors = function(response){
    for(var i = 0; i < response.length; i ++){
      meteorArray.push(new Meteor(parseFloat(response[i].reclat), parseFloat(response[i].reclong), response[i].name))
    }
    return meteorArray;
  }

  $(document).ready(function(){
    $("#address-form-container").on("submit", '#address-form', function(event){
      event.preventDefault();
      var that = $(event.target).serialize()

      $.ajax({
      method: 'POST',
      url: $(event.target).attr('action'),
      data: $(event.target).serialize()
      }).then(function(response) {
        var street = response.street.split(" ").join("+").replace(/['"]+/g, '')
        // if (street.charAt(0) === '"' && street.charAt(street.length -1) === '"') {
        //       street = street.substr(1,street.length -2);
        //   }
        street = street.replace(/"([^"]+(?="))"/g, '$1')
        var city = response.city.split(" ")
        var state = response.state

        $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ street + "+"+city+"+"+state+"&key=AIzaSyAtWTdK0yz27ukjOCJ-riZzWtIguLOW-sU", function(response){

          map1.setCenter(new google.maps.LatLng(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng  ));
        });

      });
    });

    $.ajax({
      url: 'https://data.nasa.gov/resource/gh4g-9sfh.json',
      data: {fall: "Fell"}
    }).done(function(response){
      populateMeteors(response);

      var markers = [];
      for (var i = 0; i < meteorArray.length; ++i){
        markers[i] = "something";
        markers[i] = new google.maps.Marker({
          position:{lat: meteorArray[i].lat, lng: meteorArray[i].lng},
          map: map1,
          title: 'meteor',
          customInfo: meteorArray[i].name,
          id: i
        // icon: "<img src='/images/rock.png'>"
        });

        var infowindow = new google.maps.InfoWindow({
        content: meteorArray[i].name
        });

        infowindow.open(map, markers[i]);
        google.maps.event.addListener(markers[i], 'click', function () {
          map1.setCenter(markers[this.id].getPosition());
          map1.setZoom(8);
          alert(markers[this.id].customInfo)
        })
      }
    });

  })

  // search bar
  // var input = document.getElementById('google-search-bar');
  // var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
}
