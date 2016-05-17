meteorArray = []

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7128, lng: -74.0059},
    zoom: 6
  });


  var Meteor = function(lat, lng, name){
    this.lat = lat;
    this.lng = lng;
    this.name = name;
  }

  var Position = function(usrLat, usrLng){
     new google.maps.Marker({
      position:{lat: usrLat, lng: usrLng},
      map: map,
      title: 'meteor',
      // icon: "<img src='/images/rock.png'>"
    });
  }

  var populateMeteors = function(response){
    for(var i = 0; i < response.length; i ++){
      meteorArray.push(new Meteor(parseFloat(response[i].reclat), parseFloat(response[i].reclong), response[i].name))
    }
    return meteorArray;
  }

  $(document).ready(function(){
    $.ajax({
      url: 'https://data.nasa.gov/resource/gh4g-9sfh.json',
      data: {fall: "Fell"}
    }).done(function(response){
      populateMeteors(response);
      for (var i = 0; i < meteorArray.length; i ++){
        new Position(meteorArray[i].lat, meteorArray[i].lng)
      }
    })
  })

  // search bar
  var input = document.getElementById('google-search-bar');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // bias search bar to current window
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  
}





