meteorArray = []

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7128, lng: -74.0059},
    zoom: 6
  });

  var Meteor = function(lat, lng, name, mass, year){
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.mass = mass;
    this.year = year;
  }

  var populateMeteors = function(response){

    for(var i = 0; i < response.length; i ++){
      meteorArray.push(new Meteor(parseFloat(response[i].reclat), parseFloat(response[i].reclong), response[i].name, response[i].mass, response[i].year))
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
        markers[i] = "var";
        markers[i] = new google.maps.Marker({
          position:{lat: meteorArray[i].lat, lng: meteorArray[i].lng},
          map: map1,
          title: 'meteor',
          name: meteorArray[i].name,
          lat: meteorArray[i].lat,
          lng: meteorArray[i].lng,
          mass: meteorArray[i].mass,
          year: meteorArray[i].year,
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
          var data = {name: this.name, lat: this.lat, lng: this.lng, mass: this.mass, year: this.year}

          $.ajax({
            url: 'http://www.localhost:3000/meteors',
            type: 'POST',
            data: data,
            dataType: "json",
            success: function(response){
              alert("oiwjfiojefio")
            },
            error: function(response){
              $("#meteor-show-container").html(response.responseText)
            }
          })
        })
      }
    });

  })



  // search bar
  // var input = document.getElementById('google-search-bar');
  // var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
}
