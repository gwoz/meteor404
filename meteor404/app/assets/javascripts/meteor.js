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
      var form = this;

      $.ajax({
      method: 'POST',
      url: $(event.target).attr('action'),
      data: $(event.target).serialize()
      }).then(function(response) {
        var street = response.street
        var city = response.city
        var state = response.state
        form.reset();
        $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+street+"+"+city+"+"+state+"&key=AIzaSyAtWTdK0yz27ukjOCJ-riZzWtIguLOW-sU", function(response){

          map1.setCenter(new google.maps.LatLng(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng));
          map1.setZoom(6);
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
          name: meteorArray[i].name,
          lat: meteorArray[i].lat,
          lng: meteorArray[i].lng,
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
          var data = {name: this.name, lat: this.lat, lng: this.lng}
          var json = JSON.stringify(data)

          $.ajax({
            url: 'http://www.localhost:3000/meteors'+"?&authenticity_token=" + AUTH_TOKEN,
            type: 'POST',
            data: json,
            dataType: "json"
          }).done(function(response){
            debugger;
          })
          // alert(markers[this.id].customInfo)
        })
      }
    });

  })



  // search bar
  // var input = document.getElementById('google-search-bar');
  // var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
}
