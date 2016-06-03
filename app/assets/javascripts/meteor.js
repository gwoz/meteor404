meteorArray = [];

var map;
// Callback function used to initialize map on meteors/index.html.erb
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7128, lng: -95.0059},
    zoom: 4
  });

  // Meteor object used to store meteor data from NASA api
  var Meteor = function(lat, lng, name, mass, year){
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.mass = mass;
    this.year = year;
  };

  // Loop used to store NASA meteor data in Meteor objects 
  var populateMeteors = function(response){
    for(var i = 0; i < response.length; i ++){
      meteorArray.push(new Meteor(parseFloat(response[i].reclat), parseFloat(response[i].reclong), response[i].name, response[i].mass, response[i].year));
    }
    return meteorArray;
  };

  $(document).ready(function(){
    $("#directions-container").hide();
    // jQuery/AJAX used to center map via form data captured from addresses/_form.html.erb
    $("#address-form-container").on("submit", '#address-form', function(event){
      event.preventDefault();
      var form = this;
      $.ajax({
      method: 'post',
      url: "https://meteor404.herokuapp.com/addresses/center_map",
      data: $(event.target).serialize()
      }).then(function(response) {
        var city = response.city;
        form.reset();
        $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+city+"", function(response){
          map.setCenter(new google.maps.LatLng(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng));
          map.setZoom(6);
        });
      });
    });

    // AJAX used to populate map with meteor data from NASA
    $.ajax({
      url: 'https://data.nasa.gov/resource/gh4g-9sfh.json',
      data: {fall: "Fell"}
    }).done(function(response){
      populateMeteors(response);

      // Loop used to create markers for all Meteors. i is stored as id so that meteor data can be retrieved for individual meteors. markers[i] = "var" is included because meteors had to be created and stored as variables dynamically. This allows meteors to be referred to by their index when markers are created.
      var markers = [];
      for (var i = 0; i < meteorArray.length; ++i){
        markers[i] = "var";
        markers[i] = new google.maps.Marker({
          position:{lat: meteorArray[i].lat, lng: meteorArray[i].lng},
          map: map,
          title: 'meteor',
          name: meteorArray[i].name,
          lat: meteorArray[i].lat,
          lng: meteorArray[i].lng,
          mass: meteorArray[i].mass,
          year: meteorArray[i].year,
          id: i
        });

        // Makes Meteors clickable events 
        google.maps.event.addListener(markers[i], 'click', function () {
          map.setCenter(markers[this.id].getPosition());
          map.setZoom(8);
          var data = {name: this.name, lat: this.lat, lng: this.lng, mass: this.mass, year: this.year};

          // Display meteor data on page when clicked
          $.ajax({
            url: 'https://meteor404.herokuapp.com/meteors',
            type: 'POST',
            data: data,
            dataType: "json",
            error: function(response){
              $("#meteor-show-container").show();
              $("#meteor-show-container").html(response.responseText);
            }
          });
        });
      }
    });

    // Remove meteor details partial on click
    $("#meteor-show-container").on("click", "#return_to_map", function(event){
      event.preventDefault()
      $("#meteor-show-container").hide();
      $("#address-form-container").show();
    })

    // Return to map from directions-container
    $("#find_another_meteor").on("click", function(event){
      event.preventDefault();
      $("#directions-container").hide();
      $("#address-form-container").show();
    })

    // Sends form data to addresses#create where HTTParty gem is used to retrieve directions from google api
    $("#meteor-show-container").on("submit", "#meteor-show-button",function(event){
      event.preventDefault();
      var lat = $("#lat").val();
      var lng = $("#lng").val();
      var street = $("#street").val();
      var city = $("#city").val();
      var state = $("#state").val();
      var country = $("#country").val();
      var data = {lat: lat, lng: lng, street: street, city: city, state: state, country: country};

      $.ajax({
        url: 'https://meteor404.herokuapp.com/addresses',
        type: 'POST',
        data: data,
        headers: {"X-Requested-With":"XMLHttpRequest"},
        dataType: "json", 
        success: function(response){
          $("#meteor-show-container").hide();
          $("#directions-container").show();
          $("#directions-list-container").html(response);
        },
      });
    });
  });
}
